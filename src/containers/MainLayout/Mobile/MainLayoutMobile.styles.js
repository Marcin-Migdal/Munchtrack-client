import { makeStyles } from "@material-ui/core";

export const classes = makeStyles( theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    display: 'flex',
    alignItems: 'center',
    height:'16vw',
    width:'100vw',
    position:'fixed',
    top:0,
    
    zIndex: 2,
    backgroundColor: theme.palette.background.main,
  },

  bottomContainer: {
    display:'flex',
    width:'100vw',
    marginTop:'16vw',
  },

  contentContainer: {
    zIndex: 1,
    width:'100%',
  },
}));








