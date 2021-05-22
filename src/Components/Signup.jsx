import React, {useEffect, useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container, makeStyles}  from '@material-ui/core';
import { Redirect } from 'react-router';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [details, setDetails] = useState({firstName:'', lastName:'', email:'', password:''});
  const [final, setFinal] = useState({firstName:'', lastName:'', email:'', password:''});
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(final)
    };
      async function fetchMyAPI() {
        await fetch('/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if(data.succeded){
            alert('registration succeeded')
            setRedirect(redirect=> !redirect);
            props.changeLogging();
            props.handleUser(final.email)
          }
          else{
            alert('email address already registrated in the system')
          }
        })      
      }
  
      fetchMyAPI()
    
    }, [final, props]);
  
  function handleChange(e){
    const {value, name} = e.target;

    setDetails(preValue => {
      if(name === 'firstName'){
        return {
          firstName: value,
          lastName: preValue.lastName,
          email: preValue.email,
          password: preValue.password
        }
      }
      if(name === 'lastName'){
        return {
          firstName: preValue.firstName,
          lastName: value,
          email: preValue.email,
          password: preValue.password
        }
      }
      if(name === 'email'){
        return {
          firstName: preValue.firstName,
          lastName: preValue.lastName,
          email: value,
          password: preValue.password
        }
      }
      if(name === 'password'){
        return {
          firstName: preValue.firstName,
          lastName: preValue.lastName,
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
          Sign up
        </Typography>
        <form className={classes.form}> 
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
            <br></br>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Sign Up
          </Button>
          {redirect &&  <Redirect push to="/" />}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}