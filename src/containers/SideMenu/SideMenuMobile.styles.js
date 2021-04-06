import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
  sideMenuContainerEnabled: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90vw',
    height: '100%',
    position: 'fixed',
    transition: '100ms',
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.main,
  },

  sideMenuContainerDisabled: {
    width: '90vw',
    height: '100%',
    position: 'fixed',
    transition: '200ms',
    left: '-100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.main,
  },

  list: {
    marginTop: '0.4rem',
    listStyle: 'none',
  }
}));