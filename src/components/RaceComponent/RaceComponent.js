import React, { useState } from 'react';
import { classes } from './RaceComponent.styles';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import playerStatusService from '../../api/playerStatus.api';
import * as AiIcons from "react-icons/ai"
import InfoModal from '../InfoModal/InfoModal';
import { useTranslation } from 'react-i18next';

export default function RaceComponent({ mobile, isCurrentPlayer, playerStatus, refreshFlag, isSecondRace, selectContent, onlyRead }) {
  const { t } = useTranslation();

  const [raceId, setRaceId] = useState();
  const [raceInfoModalIsVisible, serRaceInfoModalIsVisible] = useState(false);
  const [showRaceInput, setShowRaceInput] = useState(false);
  const playerRace = isSecondRace ? playerStatus.secondPlayerRaceDto : playerStatus.playerRaceDto;

  const styles = classes()

  const saveRace = () => {
    const url = isSecondRace ? 'changeSecondRace' : 'changeRace'
    const changeRequest = {
      playerStatusId: playerStatus.id,
      newId: raceId,
    }

    playerStatusService.savePlayerRace(url, changeRequest)
      .then(() => {
        setRaceId()
        setShowRaceInput(false)
        refreshFlag()
      })
      .catch((e) => console.log(e))
  }

  const getMenuItemsContent = () => {
    let tempMenuItemsContent;
    if (!isSecondRace && playerStatus.secondPlayerRaceDto.id === 0) {
      tempMenuItemsContent = selectContent.filter((item) => {
        return (item.id !== playerStatus.playerRaceDto.id)
      })
    } else if (!isSecondRace) {
      tempMenuItemsContent = selectContent.filter((item) => {
        return (item.id !== playerStatus.playerRaceDto.id) && (item.id !== playerStatus.secondPlayerRaceDto.id)
      })
    } else {
      tempMenuItemsContent = selectContent.filter((item) => {
        return (item.id !== playerStatus.playerRaceDto.id) && (item.id !== playerStatus.secondPlayerRaceDto.id)
      })
    }

    return tempMenuItemsContent;
  }

  const handleChange = (event) => {
    setRaceId(event.target.value);
  };

  const SelectComponent = () => {
    const menuItemsContent = getMenuItemsContent()
    let menuItems = []

    menuItemsContent.forEach((item, index) => {
      menuItems.push(
        <MenuItem
          key={index}
          value={item.id}>
          {item.name}
        </MenuItem>
      )
    })

    return (
      <Select
        variant='filled'
        labelId="open-select-label"
        className={styles.select}
        value={raceId}
        onChange={handleChange}
        input={<Input />}
      >
        {menuItems}
      </Select>
    )
  }

  const PlayerInfoModal = () => {
    return (
      <InfoModal
        onClick={() => serRaceInfoModalIsVisible(false)}
        customModal={
          <div className={mobile ? styles.infoModalMobile : styles.infoModal}>
            <p id='infoModalTitle'>{playerRace.name}</p>
            <p id='infoModalContent'>{playerRace.description}</p>
          </div>
        } />
    )
  }

  return (
    <div className={styles.container}>
      <p>{isSecondRace ? t('game:extendedPlayer.race.secondRaceLabel') : t('game:extendedPlayer.race.firstRaceLabel')}</p>
      {!showRaceInput ?
        <div className={styles.buttonContainer}>
          <button
            id='modalButton'
            className={mobile ? styles.buttonStyleMobile : styles.buttonStyle}
            onClick={() => serRaceInfoModalIsVisible(true)}>
            {playerRace.name}
          </button>
          {(isCurrentPlayer && !onlyRead) &&
            <button
              id='saveButton'
              className={mobile ? styles.buttonStyleMobile : styles.buttonStyle}
              onClick={() => setShowRaceInput(true)}>
              {t('buttons:change')}
            </button>
          }
        </div> :
        <div className={styles.selectContainer}>
          <FormControl className={mobile ? styles.formControlContainer : ''}>
            <InputLabel
              className={styles.selectedInput}
              id="open-select-label">
              {t('buttons:choose')}
            </InputLabel>
            <SelectComponent />
          </FormControl>

          {(raceId || raceId === 0) ?
            <button
              id='saveButton'
              className={mobile ? styles.buttonStyleMobile : styles.buttonStyle}
              onClick={saveRace}>
              {t('buttons:save')}
            </button> :
            <div className={styles.iconContainer} onClick={() => setShowRaceInput(false)}>
              <AiIcons.AiOutlineClose />
            </div>
          }
        </div>
      }
      {raceInfoModalIsVisible && <PlayerInfoModal />}
    </div >
  )
}