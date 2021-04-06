import { makeStyles } from "@material-ui/core";

export const buttonDesktopClasses = makeStyles(theme => ({
  sideMenuItem: {
    display: 'flex',
    alignItems: 'center',
    height: '7vh',
    width: '17vw',
    padding: '1vh',
    fontSize: '3.5vh',
    borderRadius: '8px',
    color: '#ffffff',
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    
    webkitRouchCallout: 'none',
    webkitUserSelect: 'none',
    khtmlUserSelect: 'none',
    mozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  },

  sideMenuItemText: {
    marginLeft: '0.5rem',
    fontSize: '1.5vw',
  },
}));