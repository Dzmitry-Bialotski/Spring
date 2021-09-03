import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {
  hideRegisterFailed
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

export default function RegisterFailedAlert() {
  const classes = useStyles();
  const registerFailed = useSelector(state => state.alert.showRegisterFailed)
  const failedMessage = useSelector(state => state.alert.failedMessage)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideRegisterFailed())
  };

  return (
    <div className={classes.root}>
      <Snackbar open={registerFailed} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {failedMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
