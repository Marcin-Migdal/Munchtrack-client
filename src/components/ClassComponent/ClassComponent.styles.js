import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '6.5vh',
  },

  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  selectContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: '0.5vw',
  },

  iconContainer: {
    fontSize: '2.5vh',
    '& :hover': {
      borderRadius: '6px',
      backgroundColor: theme.palette.inActive.hover,
    },
    '& :active': {
      borderRadius: '6px',
      backgroundColor: theme.palette.inActive.active,
    },
  },

  formControlContainer: {
    margin: ' 0 0 0.5vh 1vw',
  },

  buttonStyleMobile: {
    fontSize: 'inherit',
    borderRadius: '8px',
    border: 0,
    outline: 'none',
    color: 'inherit',
    backgroundColor: theme.palette.secondary.main,

    '&#modalButton': {
      marginLeft: '1vw ',
      padding: '0 0.2vw',
    },

    '&#saveButton': {
      height: '3.5vh',
      marginLeft: '1vw ',
      padding: '0 0.3vw',
      fontSize: '2.5vh',
    },

    '&:hover': {
      backgroundColor: theme.palette.inActive.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.inActive.active,
    },

    '& p': {
      webkitRouchCallout: 'none',
      webkitUserSelect: 'none',
      khtmlUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
    },
  },

  buttonStyle: {
    fontSize: 'inherit',
    borderRadius: '8px',
    border: 0,
    outline: 'none',
    color: 'inherit',
    backgroundColor: theme.palette.secondary.main,

    '&#modalButton': {
      padding: '0 0.2vw',
      marginLeft: '0.3vw',
    },

    '&#saveButton': {
      height: '3.5vh',
      marginBottom: '0.25vh',
      padding: '0 0.3vw',
      fontSize: '2.5vh',
    },

    '&:hover': {
      backgroundColor: theme.palette.inActive.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.inActive.active,
    },

    '& p': {
      webkitRouchCallout: 'none',
      webkitUserSelect: 'none',
      khtmlUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
    },
  },

  select: {
    '&:before': {
      borderColor: theme.palette.current.main,
    },
    '&:after': {
      borderColor: theme.palette.current.main,
    },
    '& .MuiSelect-root': {
      minWidth: '60px',
    },
  },

  selectedInput: {
    '&.Mui-focused': {
      color: '#000'
    },
  },

  infoModal: {
    padding: '1.5vh',
    border: '1px solid',
    borderRadius: '12px',
    position: 'fixed',
    left: '35vw',
    top: '30vh',
    zIndex: 3,
    backgroundColor: theme.palette.secondary.main,
    '& #infoModalTitle': {
      textAlign: 'center',
      fontSize: '4vh',
      fontWeight: 600,
    },
    '& #infoModalContent': {
      maxWidth: '30vw',
      textAlign: 'center',
      fontSize: '2.5vh',
      marginTop: '1.5vh',
    },
  },

  infoModalMobile: {
    padding: '1vh',
    border: '1px solid',
    borderRadius: '12px',
    position: 'fixed',
    left: '7.5vw',
    top: '30vh',
    zIndex: 3,
    backgroundColor: theme.palette.secondary.main,

    '& #infoModalTitle': {
      textAlign: 'center',
      fontSize: '3.5vh',
      fontWeight: 500
    },
    '& #infoModalContent': {
      maxWidth: '80vw',
      textAlign: 'center',
      fontSize: '2.25vh',
      marginTop: '1vh',
    },
  },
}))