import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from "react-redux";
import NewsAddedAlert from "./alert/NewsAddedAlert";
import {requestSender} from "../../fetch/RequestSender";
import {showNewsAdded} from "../../store/actions";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    marginLeft: 'auto',
    marginRight: 'auto',
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

export default function NewsForm() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  function postNews(news){
    requestSender.saveNews(news).then(
      (response) => {
        console.log(response)
        dispatch(showNewsAdded())
      },
      (err) => {
        console.log(err)
      }
    )
  }
  return (
    <Grid container
          component="main"
          className={classes.root}>
        <div className={classes.paper}>
          <Typography component="h1"
                      variant="h5">
            Add news
          </Typography>
          <form className={classes.form}
                noValidate
                encType="multipart/form-data">
            <Grid container
                  spacing={2}>
              <Grid item
                    xs={12}>
                <TextField
                  onChange={event => setTitle(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="title"
                  name="title"
                  value={title}
                />
              </Grid>
              <Grid item
                    xs={12}>
                <TextField
                  onChange={event => setDescription(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  name="description"
                  label="description"
                  type="description"
                  id="description"
                  value={description}
                />
              </Grid>
              <Grid item
                    xs={12}>
                <TextField
                  onChange={event => setContent(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  name="content"
                  label="content"
                  type="content"
                  id="content"
                  value={content}
                />
              </Grid>
            {/*  <Grid item*/}
            {/*        xs={12}>*/}
            {/*    <Button*/}
            {/*      variant="contained"*/}
            {/*      component="label"*/}
            {/*    >*/}
            {/*      Upload Image*/}
            {/*      <input*/}
            {/*        type="file"*/}
            {/*        hidden*/}
            {/*      />*/}
            {/*    </Button>*/}
            {/*    <input*/}
            {/*      accept="image/*"*/}
            {/*      className={classes.input}*/}
            {/*      style={{ display: 'none' }}*/}
            {/*      id="raised-button-file"*/}
            {/*      multiple*/}
            {/*      type="file"*/}
            {/*    />*/}
            {/*  </Grid>*/}
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                postNews({title, description, content })
              }}
            >
              Add news
            </Button>
            <NewsAddedAlert/>
          </form>
        </div>
    </Grid>
  );
}