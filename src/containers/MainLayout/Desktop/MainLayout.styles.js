import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '6vh',
    backgroundColor: theme.palette.background.main,
  },

  bottomContainerSideMenu: {
    display: 'flex',
    flexDirection: 'row',
    height: '94vh',
    width: '100vw',
  },

  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }
}));






