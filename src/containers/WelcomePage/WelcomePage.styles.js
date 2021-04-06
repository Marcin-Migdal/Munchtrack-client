import { makeStyles } from "@material-ui/core";

export const desktopClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '84vh',
    width: '100vw',
    margin: '8vh 0',
    backgroundColor: theme.palette.background.main,
  },

  title: {
    position: 'absolute',
    top: '1vh',
    left: '45%',
    fontSize: '5vh',
    color: theme.palette.primary.main,
  },

  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '12vw',
  },

  description: {
    display: 'inline-block',
    maxWidth: '65vh',
    width: '37.5vw',
    fontSize: '2.75vh',
    color: theme.palette.secondary.main,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  button: {
    fontWeight: 600,
    margin: '1.5vh',
    marginTop: '1.5vw',
    color: theme.palette.primary.main,
  },

  sesionExpiredText: {
    width: '18vw',
    textAlign: 'center',
    fontSize: '2.25vh',
    color: theme.palette.secondary.main,
  },

  imageContainer: {
    width: '90vh',
    marginLeft: '5vw',
  },

  image: {
    maxWidth: '44vh',
    width: '22vw',
    margin: '0.1vh 0.125vw',
    borderRadius: '22px',
  }
}));