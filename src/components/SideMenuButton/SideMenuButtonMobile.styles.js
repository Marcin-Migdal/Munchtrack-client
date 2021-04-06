import { makeStyles } from "@material-ui/core";

export const buttonMobileClasses = makeStyles(theme => ({
  sideMenuItem: {
    display: 'flex',
    alignItems: 'center',
    height: '14vw',
    width: '86vw',
    padding: '2vw',
    fontSize: '7vw',
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
    marginLeft: '2.6vw',
    fontSize: '6vw',
  },
}));