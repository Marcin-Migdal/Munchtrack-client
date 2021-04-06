import React, { Suspense, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useTheme } from '@material-ui/core';
import { links } from '../../../utils/linkUtils';
import { homePageClasses } from '../../Home/Home.styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../../slices/currentUser';
import Navbar from '../../Navbar/Desktop/Navbar';
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
import { classes } from './MainLayout.styles'
import { roomsClasses } from '../../Rooms/Rooms.styles';
import { settingsClasses } from '../../Settings/Settings.styles';
import { roomClasses } from '../../Room/Room.styles';
import { roomEditClasses } from '../../RoomEdit/RoomEdit.styles';
import { SearchResultClasses } from '../../SearchResult/SearchResult.styles';
import { userPageClasses } from '../../UserPage/UserPage.styles';
import { gameClasses } from '../../Game/Game.styles';
import { gameSummaryClasses } from '../../GameSummary/GameSummary.styles';
import { layoutSelector, setLayout, toogleSideMenu } from '../../../slices/layout';

export default function MainLayout() {
  const dispatch = useDispatch()
  const { t } = useTranslation(['menu']);
  const theme = useTheme();

  const { loaded } = useSelector(layoutSelector)

  const styles = classes();

  const toggleSideMenu = () => {
    dispatch(toogleSideMenu())
  };

  useEffect(() => {
    dispatch(fetchCurrentUser())
    dispatch(setLayout({ mobile: false, sideMenuActive: true }))
  }, [dispatch]);

  return (
    <IconContext.Provider value={{ color: theme.palette.secondary.main }}>
      {loaded &&
        <div className={styles.container}>
          <div className={styles.topContainer} >
            <Navbar toggleSideMenu={toggleSideMenu} />
          </div>
          <div className={styles.bottomContainerSideMenu}>
            <SideMenu/>
            <Suspense fallback={<FallbackLoading />}>
              <div className={styles.contentContainer}>
                <Route path={links.home} render={props => <Home {...props} classes={homePageClasses} />} />
                <Route path={links.rooms} render={props => <Rooms  {...props} classes={roomsClasses} />} />
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
        </div>
      }
    </IconContext.Provider>
  );
}
