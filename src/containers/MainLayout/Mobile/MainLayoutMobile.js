import React, { useState, Suspense, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useTheme } from '@material-ui/core';
import { links } from '../../../utils/linkUtils';
import { homePageClasses } from '../../Home/HomeMobile.styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../../slices/currentUser';
import NavbarMobile from '../../Navbar/Mobile/NavbarMobile';
import SideMenu from '../../SideMenu/SideMenu';
import Home from '../../Home/Home';
import Rooms from '../../Rooms/Rooms';
import Settings from '../../Settings/Settings';
import Room from '../../Room/Room';
import RoomEdit from '../../RoomEdit/RoomEdit';
import SearchResult from '../../SearchResult/SearchResult';
import UserPage from '../../UserPage/UserPage';
import Game from '../../Game/Game';
import GameSummary from '../../GameSummary/GameSummary';
import FallbackLoading from '../../../components/FallbackLoading/FallbackLoading';
import { classes } from './MainLayoutMobile.styles'
import { roomsClasses } from '../../Rooms/RoomsMobile.styles';
import { settingsClasses } from '../../Settings/SettingsMobile.styles';
import { roomClasses } from '../../Room/RoomMobile.styles';
import { roomEditClasses } from '../../RoomEdit/RoomEditMobile.styles';
import { SearchResultClasses } from '../../SearchResult/SearchResultMobile.styles';
import { userPageClasses } from '../../UserPage/UserPageMobile.styles';
import { gameClasses } from '../../Game/GameMobile.styles';
import { gameSummaryClasses } from '../../GameSummary/GameSummaryMobile.styles';
import { closeSideMenuOnClick, layoutSelector, setLayout, toogleSideMenu } from '../../../slices/layout';

export default function MainLayoutMobile() {
  const dispatch = useDispatch()
  const { t } = useTranslation(['menu']);
  const theme = useTheme();

  const { layout, loaded } = useSelector(layoutSelector)

  const styles = classes();

  const toggleSideMenu = () => {
    dispatch(toogleSideMenu())
  };

  const closeSideMenu = () => {
    dispatch(closeSideMenuOnClick())
  };

  useEffect(() => {
    dispatch(fetchCurrentUser())
    dispatch(setLayout({ mobile: true, sideMenuActive: false }))
  }, [dispatch]);

  return (
    <IconContext.Provider value={{ color: theme.palette.secondary.main }}>
      {loaded && <div className={styles.container}>
        <div className={styles.topContainer}>
          <NavbarMobile toggleSideMenu={toggleSideMenu} sideMenuActive={layout.sideMenuActive} />
        </div>
        <div className={styles.bottomContainer}>
          <SideMenu closeSideMenu={closeSideMenu}/>
          <Suspense fallback={<FallbackLoading />}>
            <div className={styles.contentContainer}>
              <Route path={links.home} render={props => <Home {...props} classes={homePageClasses} />} />
              <Route path={links.rooms} render={props => <Rooms {...props} classes={roomsClasses} />} />
              <Route path={links.settings} render={props => <Settings {...props} classes={settingsClasses} />} />
              <Route path={links.room} render={props => <Room {...props} classes={roomClasses} />} />
              <Route path={links.roomEdit} render={props => <RoomEdit {...props} classes={roomEditClasses} />} />
              <Route path={links.searchResult} render={props => <SearchResult {...props} classes={SearchResultClasses} />} />
              <Route path={links.userPage} render={props => <UserPage {...props} classes={userPageClasses} />} />
              <Route path={links.game} render={props => <Game {...props} classes={gameClasses} />} />
              <Route path={links.gameSummary} render={props => <GameSummary {...props} classes={gameSummaryClasses} />} />
            </div>
          </Suspense>
        </div>
      </div>}
    </IconContext.Provider>
  );
}