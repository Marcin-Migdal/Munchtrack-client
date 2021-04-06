import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation } from 'react-i18next';
import ListComponent from '../../components/ListComponent/ListComponent';
import { links } from '../../utils/linkUtils';
import { useSelector } from 'react-redux';
import { layoutSelector } from '../../slices/layout';
import { useTheme } from '@material-ui/core';
import { IconContext } from 'react-icons/lib';
import HomePageComponent from '../../components/HomePageComponent/HomePageComponent';
import 'react-perfect-scrollbar/dist/css/styles.css';
import userService from '../../api/user.api';

export default function Home({ classes }) {
  const theme = useTheme();
  const { t } = useTranslation(['home']);
  const { layout } = useSelector(layoutSelector)

  const [fileNameArray, setFileNameArray] = useState();

  const iconFolder = layout.mobile ? 'mobile' : 'desktop'

  const styles = classes();

  useEffect(() => {
    let isMounted = true

    const getFileName = () => {
      userService.getImageFileNames(layout.mobile)
        .then(res => setFileNameArray(res.body))
        .catch(e => console.log(e))
    }

    isMounted && getFileName()
    return () => {
      isMounted = false
    }
  }, []);

  const getContentArray = () => {
    return [
      [
        {
          title: t('home:title.rooms'),
          buttonText: t('home:title.rooms'),
          url: links.rooms,
          imageName: fileNameArray[6],
          description: t('home:description.rooms'),
        },
        {
          title: t('home:title.sortRooms'),
          buttonText: t('home:title.rooms'),
          url: links.rooms,
          imageName: fileNameArray[10],
          description: t('home:description.sortRooms'),
        }
      ],
      [
        {
          title: t('home:title.room'),
          imageName: fileNameArray[5],
          description: t('home:description.room'),
        },
        {
          title: t('home:title.editRoom'),
          imageName: fileNameArray[0],
          description: t('home:description.editRoom'),
        }
      ],
      [
        {
          title: t('home:title.game'),
          imageName: fileNameArray[3],
          description: t('home:description.game'),
        },
        {
          title: t('home:title.extendedGame'),
          imageName: fileNameArray[1],
          description: t('home:description.extendedGame'),
        },
        {
          title: t('home:title.SwitchClassGame'),
          imageName: fileNameArray[11],
          description: t('home:description.SwitchClassGame'),
        },
      ],
      [
        {
          title: t('home:title.gameSummary'),
          imageName: fileNameArray[4],
          description: t('home:description.gameSummary'),
        },
        {
          title: t('home:title.extendedGame'),
          imageName:fileNameArray[2],
          description: t('home:description.extendedSummary'),
        },
      ],
      [
        {
          title: t('home:title.searchBar'),
          imageName: fileNameArray[7],
          description: t('home:description.searchBar'),
        },
        {
          title: t('home:title.searchResult'),
          imageName: fileNameArray[8],
          description: t('home:description.searchResult'),
        },
      ],
      [
        {
          title: t('home:title.settings'),
          buttonText: t('home:title.settings'),
          url: links.settings,
          imageName: fileNameArray[9],
          description: t('home:description.settings'),
        }
      ]
    ]
  }

  return (
    <div >
      <PerfectScrollbar>
        <div className={!layout.mobile && layout.sideMenuActive ? styles.slimContainer : styles.wideContainer}>
          <p className={styles.title}>Munchtrack</p>
          <span className={styles.description}>
            {t('home:mainTitle')}
          </span>
          <IconContext.Provider value={{ color: theme.palette.primary.main }}>
            {fileNameArray &&
              <ListComponent data={getContentArray()} mapFunction={(content, index) => {
                return (
                  <HomePageComponent
                    key={index}
                    content={content}
                    index={index}
                    sideMenuActive={layout.sideMenuActive}
                    mobile={layout.mobile} />
                )
              }} />
            }
          </IconContext.Provider>
        </div>
      </PerfectScrollbar>
    </div>
  )
}