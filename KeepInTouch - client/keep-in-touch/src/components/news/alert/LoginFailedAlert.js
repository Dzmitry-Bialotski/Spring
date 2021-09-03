import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {
  hideLoginFailed
} from "../../../store/actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LoginFailedAlert() {
  const classes = useStyles();
  const loginFailed = useSelector(state => state.alert.showLoginFailed)
  const failedMessage = useSelector(state => state.alert.failedMessage)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideLoginFailed())
  };

  return (
    <div className={classes.root}>
      <Snackbar open={loginFailed} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {failedMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
