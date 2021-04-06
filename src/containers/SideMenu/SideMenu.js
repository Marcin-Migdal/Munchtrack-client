import React, { useState } from 'react'
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import * as IoIcons from "react-icons/io"
import authenticationService from '../../api/authentication.api';
import SideMenuButton from '../../components/SideMenuButton/SideMenuButton';
import MyHr from '../../components/MyHr/MyHr';
import { buttonDesktopClasses } from '../../components/SideMenuButton/SideMenuButton.styles';
import { buttonMobileClasses } from '../../components/SideMenuButton/SideMenuButtonMobile.styles';
import { useHistory, useLocation } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import playerStatusService from '../../api/playerStatus.api';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import { layoutSelector } from '../../slices/layout';
import { useSelector } from 'react-redux';
import { desktopClasses } from './SideMenu.styles';
import { mobileClasses } from './SideMenuMobile.styles';

export default function SideMenu({ closeSideMenu }) {
  const { t } = useTranslation(['buttons']);
  const location = useLocation();
  const history = useHistory();

  const { layout } = useSelector(layoutSelector)
  const [modal, setModal] = useState(false);

  const styles = layout.mobile ? mobileClasses() : desktopClasses();
  const buttonStyles = layout.mobile ? buttonMobileClasses : buttonDesktopClasses;

  const showExitModal = (path) => {
    setModal(
      <ConfirmationModal
        text={t('menu:sideMenu.modal.exitRoom')}
        onClickYes={() => leaveRoom(path)}
        onClickNo={() => setModal()} />
    )
  }

  const showSignOutModal = () => {
    setModal(
      <ConfirmationModal
        text={t('menu:sideMenu.modal.signOut')}
        onClickYes={() => signOut()}
        onClickNo={() => setModal()} />
    )
  }

  const leaveRoom = (path) => {
    setModal()
    playerStatusService.leaveRoom(location.state.roomId)
      .then(() => {
        history.replace(path)
      })
  }

  const signOut = () => {
    setModal()
    authenticationService.signOut();
  }

  const onClick = (path) => {
    layout.mobile && closeSideMenu()
    if (history.location.pathname === links.game) {
      showExitModal(path)
      return;
    }

    if (!path) {
      showSignOutModal()
      return;
    }
    history.push(path);
  }

  return (
    <div className={layout.sideMenuActive ? styles.sideMenuContainerEnabled : styles.sideMenuContainerDisabled}>
      <MyHr />
      <ul className={styles.list}>
        <li >
          <SideMenuButton
            icon={<AiIcons.AiFillHome />}
            text={t('menu:sideMenu.button.rooms')}
            classes={buttonStyles}
            onClick={() => onClick(links.rooms)} />
        </li>
        <li >
          <SideMenuButton
            icon={<IoIcons.IoIosSettings />}
            text={t('menu:sideMenu.button.settings')}
            classes={buttonStyles}
            onClick={() => onClick(links.settings)} />
        </li>
        <li >
          {location.pathname === links.game ?
            <SideMenuButton
              icon={<BiIcons.BiArrowBack />}
              text={t('buttons:back')}
              classes={buttonStyles}
              onClick={() => onClick(links.rooms)}
            /> :
            <SideMenuButton
              icon={<AiIcons.AiOutlineLogout />}
              text={t('menu:sideMenu.button.signOut')}
              classes={buttonStyles}
              onClick={() => { onClick() }} />}
        </li>
      </ul>
      {modal && modal}
    </div>
  )
}
