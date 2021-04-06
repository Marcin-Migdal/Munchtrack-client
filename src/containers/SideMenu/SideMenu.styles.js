import { makeStyles } from "@material-ui/core";

export const desktopClasses = makeStyles(theme => ({
  sideMenuContainerEnabled: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '18vw',
    position: 'fixed',
    transition: '300ms',
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.main,
  },

  sideMenuContainerDisabled: {
    height: '100%',
    width: '18vw',
    position: 'fixed',
    transition: '600ms',
    left: '-100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.main,
  },

  list: {
    marginTop: '0.5rem',
    listStyle: 'none',
  }
}));