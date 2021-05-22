import React, {useEffect, useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, 
  Link, Grid, Typography, makeStyles, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Redirect } from 'react-router';
// import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
    const classes = useStyles();
    const [details, setDetails] = useState({email:'', password:''})
    const [final, setFinal] = useState({email:'', password:''});
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(final)
      };
      async function fetchMyAPI() {
        await fetch('/login', requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.succeded){
              setRedirect(redirect=> !redirect);
              console.log(data.events)
              props.changeLogging();
              props.handleUser(final.email)
              props.handleEvents(data.events)
            }
            else
              alert('פרטי ההתחברות לא נכונים')
          })
      }
        fetchMyAPI()
    }, [final, props]);

    function handleChange(e){
      const {value, name} = e.target;
  
      setDetails(preValue => {
        if(name === 'email'){
          return {
            email: value,
            password: preValue.password
          }
        }
        if(name === 'password'){
          return {
            email: preValue.email,
            password: value
          }
        }
      })
    }

    function handleClick(e){
      e.preventDefault();
      setFinal(details);
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={details.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={details.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>

          {redirect &&  
            <Redirect push to="/"
            />}

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}