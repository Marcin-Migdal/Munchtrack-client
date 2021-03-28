import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Button, CircularProgress, useTheme } from '@material-ui/core';
import { IconContext } from 'react-icons/lib';
import playerStatusService from '../../api/playerStatus.api';
import InfoModal from '../../components/InfoModal/InfoModal';
import ListComponent from '../../components/ListComponent/ListComponent';
import ExtendedPlayerListItem from '../../components/ExtendedPlayerListItem/ExtendedPlayerListItem';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as AiIcons from "react-icons/ai"
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoomInStore } from '../../slices/room';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function Game({ classes }) {
  const dispatch = useDispatch()
  const { t } = useTranslation(['game']);
  const theme = useTheme()
  const location = useLocation();
  const history = useHistory();

  const { room, layout, currentUser, currentUserLoading } = useSelector((state) => {
    return {
      room: state.room.room,
      layout: state.layout.layout,
      currentUser: state.currentUser.currentUser,
      currentUserLoading: state.currentUser.currentUserLoading
    }
  })

  const [playerStatuses, setPlayerStatuses] = useState();
  const [playerStatusRefreshFlag, setPlayerStatusRefreshFlag] = useState(0);

  const [notyfication, setNotyfication] = useState();

  const [isExtended, setIsExtended] = useState({ isExtendedArray: [], isInMemory: false });
  const [isModified, setIsModified] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [changeLevelButtonDisabled, setChangeLevelButtonDisabled] = useState(false);

  const styles = classes();

  useEffect(() => {
    let isMounted = true

    function handleEvent(event) {
      event.preventDefault();
      event.returnValue = '';
      playerStatusService.leaveRoom(location.state.roomId)
      setNotyfication(<LeftRoomModal />)
    }

    const checkIfEnteredCorrectly = () => {
      if (!location.state) {
        history.replace(links.rooms);
      }
    }

    isMounted && checkIfEnteredCorrectly()
    window.addEventListener("beforeunload", handleEvent);
    return () => {
      isMounted = false
      room && dispatch(deleteRoomInStore())
      location.state && playerStatusService.leaveRoom(location.state.roomId)
      window.removeEventListener("beforeunload", handleEvent);
    }

  }, [location, layout.mobile, history]);

  useEffect(() => {
    let isMounted = true

    const isPlayerInRoom = (playerStatuses) => {
      let currentPlayerInRoom = false
      playerStatuses.forEach((playerStatus) => {
        if (playerStatus.user.id === currentUser.id) {
          currentPlayerInRoom = true;
        }
      })
      if (!currentPlayerInRoom) {
        setNotyfication(<LeftRoomModal />)
      }
    }

    const fetchPlayerStatuses = () => {
      console.log(location.state.roomId)
      playerStatusService.getAllPlayersStatusesInRoom(location.state.roomId)
        .then(playerStatuses => {
          if (playerStatusRefreshFlag === 0) {
            isPlayerInRoom(playerStatuses.body)
          }
          setPlayerStatuses(playerStatuses.body)
        })
        .catch((e) => {
          console.log(e)
          setNotyfication(<LeftRoomModal />)
        })
    }

    const createIsExtendedArray = (length) => {
      let tempIsExtended = new Array(length)
      for (let i = 0; i < length; i++) {
        tempIsExtended[i] = { isExtended: false };
      }
      setIsExtended({ isExtendedArray: tempIsExtended, isInMemory: true })
    }

    const setUpRoom = () => {
      if (room.complete) {
        goToGameSummary()
      } else {
        !isExtended.isInMemory && createIsExtendedArray(room.slots)
        fetchPlayerStatuses()
      }
    }

    isMounted && setUpRoom()

    return () => {
      isMounted = false
    }
  }, [playerStatusRefreshFlag, location, history, currentUser]);

  const goToGameSummary = () => {
    console.log(room)
    history.replace({
      pathname: links.gameSummary,
      state: {
        roomId: room.id,
        creatorId: room.creatorId,
        roomName: room.roomName
      }
    });
  }

  const confirmWinning = (index, playerStatus) => {
    let newPlayerStatuses = [...playerStatuses]
    playerStatus.playerLevel = 10;
    newPlayerStatuses[index] = playerStatus;

    setPlayerStatuses(newPlayerStatuses);
    savePlayerStatus()
  }

  const LeftRoomModal = () => {
    return (
      <InfoModal
        text={t('game:game.modal.leaveRoom')}
        onClick={() => {
          history.replace({
            pathname: links.room,
            state: {
              roomId: location.state.roomId,
            }
          });
        }} />
    )
  }

  const findCurrentPlayerStatus = (playerStatuses) => {
    let playerStatusData = {};

    playerStatuses.map((playerStatus, index) => {
      if (playerStatus.user.id === currentUser.id) {
        playerStatusData = {
          index: index,
          playerStatus: playerStatus,
        }
      }
    });

    return playerStatusData;
  }

  const setLevel = (level) => {
    saveButtonDisabled && setSaveButtonDisabled(false)
    changeLevelButtonDisabled && setChangeLevelButtonDisabled(false)
    const { playerStatus, index } = findCurrentPlayerStatus(playerStatuses, currentUser.id)

    if (playerStatus.playerLevel + level <= 0) {
      setNotyficationModal(t('game:game.notyfication.levelTooLow'))
    }
    else if (playerStatus.playerLevel + level < 9) {
      playerStatus.playerLevel = playerStatus.playerLevel + level
      setNewPlayerStatuses(index, playerStatus)
    }
    else if (playerStatus.playerLevel + level === 9) {
      playerStatus.playerLevel = playerStatus.playerLevel + level
      setNewPlayerStatuses(index, playerStatus)
      setChangeLevelButtonDisabled(true)
    }
    else if (playerStatus.playerLevel + level === 10) {
      setWinningConfirmationModal(index, playerStatus)
      playerStatus.playerLevel = playerStatus.playerLevel + level
    }
  }

  const setWinningConfirmationModal = (index, playerStatus) => {
    setNotyfication(
      <ConfirmationModal
        text={t('game:game.modal.winning')}
        onClickYes={() => confirmWinning(index, playerStatus)}
        onClickNo={() => declineWinning(index, playerStatus)} />
    )
  }

  const declineWinning = (index, playerStatus) => {
    let newPlayerStatuses = [...playerStatuses]
    playerStatus.playerLevel = 9
    newPlayerStatuses[index] = playerStatus;

    setPlayerStatuses(newPlayerStatuses);
    setNotyfication()
  }

  const setBonus = (bonus) => {
    const { playerStatus, index } = findCurrentPlayerStatus(playerStatuses, currentUser.id)

    if (playerStatus.playerBonus + bonus < 0) {
      setNotyficationModal(t('game:game.notyfication.bonusTooLow'))
    }
    else if (playerStatus.playerBonus + bonus > 990) {
      setNotyficationModal(t('game:game.notyfication.maxBonus'))
    }
    else {
      playerStatus.playerBonus = playerStatus.playerBonus + bonus
      setNewPlayerStatuses(index, playerStatus)
    }
  }

  const setNewPlayerStatuses = (index, playerStatus) => {
    let newPlayerStatuses = [...playerStatuses]
    newPlayerStatuses[index] = playerStatus;
    setPlayerStatuses(newPlayerStatuses);
    !isModified && setIsModified(true)
  }

  const setNotyficationModal = (text) => {
    setNotyfication(
      <InfoModal
        text={text}
        onClick={() => {
          setNotyfication()
        }} />
    )
  }

  const savePlayerStatus = () => {
    const { playerStatus } = findCurrentPlayerStatus(playerStatuses);
    const playerStatusEditRequest = {
      playerStatusId: playerStatus.id,
      levelValue: playerStatus.playerLevel,
      bonusValue: playerStatus.playerBonus,
    }

    playerStatusService.savePlayerStatus(playerStatusEditRequest)
      .then((res) => {
        setIsModified(false)
        refreshPlayerStatuses()
        if (playerStatusEditRequest.levelValue === 10) {
          goToGameSummary()
        }
      })
      .catch((e) => {
        setNotyficationModal(t('game:game.error'))
        console.log(e)
      })
  }

  const refreshPlayerStatuses = () => {
    changeLevelButtonDisabled && setChangeLevelButtonDisabled(false)
    setIsModified(false);
    setPlayerStatusRefreshFlag(prevState => (prevState + 1))
  }

  const showExtendedPlayerStatus = (index) => {
    let newIsExtended = [...isExtended.isExtendedArray]
    newIsExtended[index].isExtended = !isExtended.isExtendedArray[index].isExtended;
    setIsExtended((prevState => ({ ...prevState, isExtendedArray: newIsExtended })));
  }

  const MyButton = ({ id, onClick, icon, type }) => {
    return (
      <Button
        disabled={type === 'levelUp' ? changeLevelButtonDisabled : false}
        id={id}
        className={styles.button}
        variant="outlined"
        color="primary"
        onClick={onClick}>
        {icon}
      </Button >
    )
  }

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar>
        {(!currentUserLoading && currentUser && room) &&
          <div className={styles.scrollContentContainer}>
            <div className={styles.topContainer}>
              <p className={styles.roomNameText}>{t('game:game.titleLabel')}{room.roomName}</p>
              {(playerStatuses && isExtended.isInMemory) ?
                <ListComponent data={playerStatuses} mapFunction={(playerStatus, index) => {
                  return (
                    <IconContext.Provider key={index}
                      value={{
                        color: currentUser.id === playerStatus.user.id ?
                          theme.palette.current.main :
                          theme.palette.primary.main
                      }}>
                      <ExtendedPlayerListItem
                        mobile={layout.mobile}
                        playerStatus={playerStatus}
                        isCurrentPlayer={currentUser.id === playerStatus.user.id}
                        creatorId={room.creatorId}
                        isExtended={isExtended.isExtendedArray[index].isExtended}
                        action={() => showExtendedPlayerStatus(index)}
                        refreshFlag={refreshPlayerStatuses} />
                    </IconContext.Provider>
                  )
                }} /> :
                <div className={styles.loaderContainer}>
                  <CircularProgress size={layout.mobile ? 50 : 40} color="primary" />
                </div>
              }
            </div>
            <div className={styles.bottomContainer}>
              <div className={styles.bottomTextContainer}>
                <p className={styles.text}>{t('game:playerStatistics.title.level')}</p>
                <p className={styles.text}>{t('game:playerStatistics.title.bonus')}</p>
              </div>
              <div className={styles.playerStatusButtonContainer}>
                <IconContext.Provider value={{ color: theme.palette.primary.main }}>
                  <MyButton
                    id='leftButton'
                    onClick={() => setLevel(-1)}
                    icon={<AiIcons.AiOutlineMinus />} />
                  <MyButton
                    id='middleButton'
                    onClick={() => setLevel(1)}
                    icon={<AiIcons.AiOutlinePlus />}
                    type='levelUp' />
                  <MyButton
                    id='middleButton'
                    onClick={() => setBonus(-1)}
                    icon={<AiIcons.AiOutlineMinus />} />
                  <MyButton
                    id='rightButton'
                    onClick={() => setBonus(1)}
                    icon={<AiIcons.AiOutlinePlus />} />
                </IconContext.Provider>
              </div>
              <div className={styles.bottomButtonContainer}>
                {isModified &&
                  <Button
                    id='save'
                    disabled={saveButtonDisabled}
                    className={styles.playerStatusButton}
                    variant={"contained"}
                    color="primary"
                    onClick={savePlayerStatus}>
                    {t('game:game.saveStatus')}
                  </Button>
                }
                <Button
                  id='reload'
                  className={styles.playerStatusButton}
                  variant={"contained"}
                  color="primary"
                  onClick={refreshPlayerStatuses}>
                  <AiIcons.AiOutlineReload />
                </Button>
              </div>
            </div>
            {notyfication}
          </div>
        }
      </PerfectScrollbar>
    </div>
  )
}