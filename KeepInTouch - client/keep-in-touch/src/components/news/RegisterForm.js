import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {NavLink} from "react-router-dom";
import RegisterCompletedAlert from "./alert/RegisterCompletedAlert";
import {showRegisterCompleted, showRegisterFailed} from "../../store/actions";
import {useDispatch} from "react-redux";
import {requestSender} from "../../fetch/RequestSender";
import RegisterFailedAlert from "./alert/RegisterFailedAlert";
import Copyright from "./Copyright";

function register(login, password, dispatch){
  if(/^[a-zA-Z1-9]+$/.test(login) === false) {
    dispatch(showRegisterFailed('Login should contain only latin letters'))
    return
  }
  if(login.length < 4 || login.length > 20) {
    dispatch(showRegisterFailed('Login should have from 4 to 20 letters'))
    return
  }
  if(parseInt(login.substr(0, 1))) {
    dispatch(showRegisterFailed('Login should start with letter'))
    return
  }
  if(password.length < 4 || password.length > 30) {
    dispatch(showRegisterFailed('Password should have from 4 to 30 letters'))
    return
  }
  requestSender.register({
    login: login,
    password: password
  }).then(response => {
    console.log("response.message: ", response.message);
    if(response.message){
      dispatch(showRegisterCompleted())
    }else{
      dispatch(showRegisterFailed(response.errorMessage))
    }
    // if(response.message === null){
    //   dispatch(showRegisterCompleted())
    // }
    // else{
    //   dispatch(showRegisterFailed(response.errorMessage))
    // }
  })
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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

export default function RegisterForm() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={event => setLogin(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  autoComplete="login"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={event => setPassword(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                register(login, password, dispatch)
              }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" >
                  <Typography color="primary" variant="body2" >
                    {"Already have an account? Login"}
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            <RegisterCompletedAlert/>
            <RegisterFailedAlert/>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}