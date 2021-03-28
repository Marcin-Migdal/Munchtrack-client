import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.background.main,
  },

  title: {
    position: 'absolute',
    top: '7vh',
    fontSize: '6vh',
    color: theme.palette.secondary.main,
  },

  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  description: {
    textAlign: 'center',
    width: '90vw',
    marginTop: '10vh',
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  button: {
    width: '33vw',
    margin: '0.35vh 0',
    fontWeight: 600,
    fontSize: '1.4vh',
    borderRadius: '8px',
    color: theme.palette.primary.main,
  },

  sesionExpiredText: {
    width: '55vw',
    textAlign: 'center',
    fontSize: '2vh',
    color: theme.palette.secondary.main,
  },

  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiIconButton-root': {
      height: '6vh',
      width: '6vh',
    },
    '&  .MuiIconButton-label': {
      fontSize: '3vh',
    }
  },

  image: {
    height: '50vh',
    width: '50vw',
    margin: '2vh 0',
    border: '1px solid',
    borderRadius: '16px',
    borderColor: theme.palette.secondary.main,
  },
}));