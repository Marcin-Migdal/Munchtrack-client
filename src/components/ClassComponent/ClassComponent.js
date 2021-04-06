import React, { useState } from 'react';
import { classes } from './ClassComponent.styles';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import playerStatusService from '../../api/playerStatus.api';
import * as AiIcons from "react-icons/ai"
import InfoModal from '../InfoModal/InfoModal';
import { useTranslation } from 'react-i18next';

export default function ClassComponent({ mobile, isCurrentPlayer, playerStatus, refreshFlag, isSecondClass, selectContent, onlyRead }) {
  const { t } = useTranslation();

  const [classId, setClassId] = useState();
  const [classInfoModal, setClassInfoModal] = useState();
  const [showClassInput, setShowClassInput] = useState(false);

  const playerClass = isSecondClass ? playerStatus.secondPlayerClassDto : playerStatus.playerClassDto;

  const styles = classes()

  const saveClass = () => {
    const url = isSecondClass ? 'changeSecondClass' : 'changeClass'
    const changeRequest = {
      playerStatusId: playerStatus.id,
      newId: classId,
    }

    playerStatusService.savePlayerClass(url, changeRequest)
      .then(() => {
        setClassId()
        setShowClassInput(false)
        refreshFlag()
      })
      .catch((e) => console.log(e))
  }

  const getMenuItemsContent = () => {
    let tempMenuItemsContent;
    if (!isSecondClass && playerStatus.secondPlayerClassDto.id === 0) {
      tempMenuItemsContent = selectContent.filter((item) => {
        return (item.id !== playerStatus.playerClassDto.id)
      })
    } else if (!isSecondClass) {
      tempMenuItemsContent = selectContent.filter((item) => {
        return (item.id !== playerStatus.playerClassDto.id) && (item.id !== playerStatus.secondPlayerClassDto.id)
      })
    } else {
      tempMenuItemsContent = selectContent.filter((item) => {
        return (item.id !== playerStatus.playerClassDto.id) && (item.id !== playerStatus.secondPlayerClassDto.id)
      })
    }

    return tempMenuItemsContent;
  }

  const handleChange = (event) => {
    setClassId(event.target.value);
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
        value={classId}
        onChange={handleChange}
        input={<Input />}
      >
        {menuItems}
      </Select>
    )
  }

  const setPlayerInfoModal = () => {
    setClassInfoModal(
      <InfoModal
        onClick={() => setClassInfoModal()}
        customModal={
          <div className={mobile ? styles.infoModalMobile : styles.infoModal}>
            <p id='infoModalTitle'>{playerClass.name}</p>
            <p id='infoModalContent'>{playerClass.description}</p>
          </div>
        } />
    )
  }

  return (
    <div className={styles.container}>
      <p>{isSecondClass ? t('game:extendedPlayer.class.secondClassLabel') : t('game:extendedPlayer.class.firstClassLabel')}</p>
      {!showClassInput ?
        <div className={styles.buttonContainer}>
          <button
            id='modalButton'
            className={mobile ? styles.buttonStyleMobile : styles.buttonStyle}
            onClick={setPlayerInfoModal}>
            {playerClass.name}
          </button>
          {(isCurrentPlayer && !onlyRead) &&
            <button
              id='saveButton'
              className={mobile ? styles.buttonStyleMobile : styles.buttonStyle}
              onClick={() => setShowClassInput(true)}>
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

          {(classId || classId === 0) ?
            <button
              id='saveButton'
              className={mobile ? styles.buttonStyleMobile : styles.buttonStyle}
              onClick={saveClass}>
              {t('buttons:save')}
            </button> :
            <div className={styles.iconContainer} onClick={() => setShowClassInput(false)}>
              <AiIcons.AiOutlineClose />
            </div>
          }
        </div>
      }
      {classInfoModal}
    </div >
  )
}