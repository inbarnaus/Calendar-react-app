import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button1: {
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
  }},
  button2: {
    '&:hover': {
      color: '#fff',
  }},
}));


function ToolBar(){
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" className={classes.title}>
                    Online Calendar
                </Typography>
                <Button href="/login" color="inherit" className={classes.button1}>Login</Button>
                <Button href="/signup" className={classes.button2}>SignUp</Button>
            </Toolbar>
        </AppBar>
    );
}

export default ToolBar;