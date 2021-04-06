import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import * as IoIcons from "react-icons/io"
import { IconContext } from 'react-icons/lib';
import ListComponent from '../../components/ListComponent/ListComponent';

import roomsImage from '../../resources/images/desktop/rooms.png'
import roomImage from '../../resources/images/desktop/room.png'
import switchClassGameImage from '../../resources/images/desktop/switchClassGame.png'
import searchResultImage from '../../resources/images/desktop/searchResult.png'

import roomsMobileImage from '../../resources/images/mobile/rooms.png'
import roomMobileImage from '../../resources/images/mobile/room.png'
import switchClassGameMobileImage from '../../resources/images/mobile/switchClassGame.png'
import searchResultMobileImage from '../../resources/images/mobile/searchResult.png'

export default function WelcomePage({ classes }) {
  const { t } = useTranslation(['auth', 'inputLabels']);
  const mobile = useMediaQuery('(max-width:620px)');
  const theme = useTheme();

  const [contentArrayIndex, setContentArrayIndex] = useState(0);

  const imageDesktopArray = [roomsImage, roomImage, switchClassGameImage, searchResultImage]
  const imageMobileArray = [roomsMobileImage, roomMobileImage, switchClassGameMobileImage, searchResultMobileImage]
  const imageArray = mobile ? imageMobileArray : imageDesktopArray

  const styles = classes();

  useEffect(() => {
    return () => localStorage.removeItem('tokenExpired')
  }, []);

  const DesktopImages = () => {
    return (
      <div className={styles.imageContainer}>
        <ListComponent data={imageArray} mapFunction={(item, index) => {
          return <img key={index} className={styles.image} src={item} />
        }} />
      </div>
    )
  }

  const MobileImages = () => {
    return (
      <div className={styles.imageContainer}>
        <IconButton className={styles.imageButton} onClick={prevContent}>
          <IoIcons.IoIosArrowBack />
        </IconButton>
        <img className={styles.image} src={imageArray[contentArrayIndex]} />
        <IconButton className={styles.imageButton} onClick={nextContent}>
          <IoIcons.IoIosArrowForward />
        </IconButton>
      </div>
    )
  }

  const prevContent = () => {
    if (contentArrayIndex > 0) {
      setContentArrayIndex(prevState => prevState - 1)
    }
  }

  const nextContent = () => {
    if (contentArrayIndex < imageArray.length - 1) {
      setContentArrayIndex(prevState => prevState + 1)
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Munchtrack</p>
      <div className={styles.descriptionContainer}>
        <span className={styles.description}>{t('auth:welcomePage.description')}</span>
        <div className={styles.buttonContainer}>
          {mobile &&
            <IconContext.Provider value={{ color: theme.palette.secondary.main }}>
              <MobileImages />
            </IconContext.Provider>
          }
          <Button
            component={Link}
            to={links.login}
            variant="contained"
            color="secondary"
            className={styles.button}>
            {t('auth:buttons.signIn')}
          </Button>
          <Button
            component={Link}
            to={links.register}
            variant="contained"
            color="secondary"
            className={styles.button}>
            {t('auth:buttons.signUp')}
          </Button>
        </div>
        {localStorage.getItem('tokenExpired') &&
          <p className={styles.sesionExpiredText}>{t('auth:welcomePage.sesionExpired')}</p>
        }
      </div>
      {!mobile && <DesktopImages />}
    </div>
  )
}