import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '10vh 0',
    color: theme.palette.primary.main,
  },

  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&#sideContainer': {
      width: '30vw',
      margin: '0 3vw',
    },
    '&#imageContainer': {
      position: 'relative',
    }
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '77vh',
    maxHeight: '45vh',
    width: '38.5vw',
    height: '27.5vw',
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
    bottom: '-8vh',
  },

  titleText: {
    fontSize: '4vh',
    fontWeight: 500,
  },

  description: {
    textAlign: 'center',
    marginTop: '1vh',
    marginBottom: '2vh',
    fontSize: '2.25vh',
  },

  button: {
    width: 'fit-content'
  },

  slimCustomHr: {
    height: '1px',
    width: '78vw',
    border: 0,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.main,
  },

  wideCustomHr: {
    height: '1px',
    width: '94vw',
    border: 0,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.main,
  }
}));