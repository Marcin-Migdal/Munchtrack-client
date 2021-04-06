import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '8vh 0',
    color: theme.palette.primary.main,
  },

  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&#sideContainer': {
      width: '60vw',
      margin: '0 0.5vh',
    },
    '&#imageContainer': {
      position: 'relative',
      margin: '0 0.5vh',
    }
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15vh',
    height: '30vh',
    borderRadius: '16px',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    overflow: 'hidden'
  },

  image: {
    width: '100%',
    height: '100%',
  },


  imageButtonContainer: {
    position: 'absolute',
    bottom: '-6vh',
  },

  titleText: {
    textAlign: 'center',
    fontSize: '3.5vh',
    fontWeight: 500,
  },

  description: {
    textAlign: 'center',
    margin: '2vh 0',
    fontSize: '1.75vh',
  },

  button: {
    width: 'fit-content'
  },

  wideCustomHr: {
    height: '1px',
    width: '90vw',
    border: 0,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.main,
  }
}));