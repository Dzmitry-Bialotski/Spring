import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {NavLink, Route, withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {changeTitle, deleteNews, deleteUserFromStore, loadNews} from "../../store/actions";
import {requestSender} from "../../fetch/RequestSender";
import logo from './../../img/logo.jpg'
const useStyles = makeStyles((theme) => ({
  boldButton: {
    fontWeight: "bolder",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  searchButton: {
    color: "white",
  },
  navLink: {
    textDecoration: "none",
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    paddingLeft: '1em',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '16ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
function logout(dispatch, history){
  localStorage.removeItem("login")
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  requestSender.token = ""
  dispatch(deleteUserFromStore())
  history.push('/login')
}

function LoginSection({history}){
  const classes = useStyles();
  const dispatch = useDispatch();
  const login = useSelector(state => state.user.login)
  const role = useSelector(state => state.user.role)
  if(login){
    return (
      <>
        <Typography variant="body1">
          {login}
          {/*({role})*/}
        </Typography>
        <IconButton
          className={classes.menuButton}
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Button variant="contained"
                color="secondary"
                className={[classes.menuButton, classes.boldButton].join(" ")}
                onClick={() => {logout(dispatch, history)}}
        >
          Logout
        </Button>
      </>
    )
  } else{
    return (
      <>
        <NavLink to="/login" className={classes.navLink}>
          <Button variant="contained"
                  color="secondary"
                  className={[classes.menuButton, classes.boldButton].join(" ")}>
            Login
          </Button>
        </NavLink>
        <NavLink to="/register" className={classes.navLink}>
          <Button variant="contained"
                  className={[classes.menuButton, classes.boldButton].join(" ")}
          >
            Register
          </Button>
        </NavLink>
      </>
    )
  }
}
function searchNews(title, dispatch){
  
}

function PrimarySearchAppBar({history}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = useSelector(state => state.news.title)
  const page = useSelector(state => state.news.page)
  const size = useSelector(state => state.news.size)

  function onSearchChangeHandler(event){
    dispatch(changeTitle(event.target.value))
  }
  function onSearchSubmitHandler(){
    dispatch(deleteNews())
    dispatch(loadNews(title, page, size))
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <NavLink to="/">
              <img  src={logo}
                    height="45px"
                    alt="logo"/>
            </NavLink>
            <Route exact path={['/news','/']}>
              <div className={classes.search}>
                <InputBase
                  placeholder="Search news…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={title}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={onSearchChangeHandler}
                />
                <Button
                  className={classes.searchButton}
                  onClick={onSearchSubmitHandler}
                ><SearchIcon /></Button>
              </div>
              <NavLink to="/news/add" className={classes.navLink}>
                <Button variant="contained"
                        color="primary"
                        className={[classes.menuButton, classes.boldButton].join(" ")}>
                  AddNews
                </Button>
              </NavLink>
            </Route>
            <div className={classes.grow} />
            <LoginSection history={history}/>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default withRouter(PrimarySearchAppBar)
