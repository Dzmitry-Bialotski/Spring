import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink, withRouter} from "react-router-dom";
import {saveUserToStore, showLoginFailed} from "../../store/actions";
import {requestSender} from "../../fetch/RequestSender";
import {useDispatch} from "react-redux";
import LoginFailedAlert from "./alert/LoginFailedAlert";
import Copyright from "./Copyright";

function auth(login, password, dispatch, history){
  requestSender.auth({
    login: login,
    password: password
  }).then(response => {
    console.log("response: ", response);
    if(response.errorMessage){
      dispatch(showLoginFailed(response.errorMessage))
    }else{
      dispatch(saveUserToStore(login, response.token, response.role))
      requestSender.token = response.token
      localStorage.setItem("login", login)
      localStorage.setItem("role", response.role)
      localStorage.setItem("token", response.token)
      history.push('/')
    }
  })
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

function LoginForm({history}) {
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
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={event => setLogin(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              onChange={event => setPassword(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                auth(login, password, dispatch, history)
              }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/register" >
                  <Typography color="primary" variant="body2" >
                    {"Don't have an account? Register"}
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            <LoginFailedAlert/>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default withRouter(LoginForm)