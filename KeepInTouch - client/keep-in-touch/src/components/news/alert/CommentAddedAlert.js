import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {hideNewsAdded, hideRegisterCompleted} from "../../../store/actions";

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

export default function CommentAddedAlert() {
  const classes = useStyles();
  const newsAdded = useSelector(state => state.alert.showNewsAdded)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideNewsAdded())
  };

  return (
    <div className={classes.root}>
      <Snackbar open={newsAdded} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Comment added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
