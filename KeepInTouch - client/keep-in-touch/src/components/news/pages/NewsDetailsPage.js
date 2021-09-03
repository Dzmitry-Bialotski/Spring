import Footer from "../../Footer/CustomFooter";
import PrimarySearchAppBar from "../Navbar";
import CommentList from "../CommentList";
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Container, FormControlLabel, TextField} from "@material-ui/core";
import './page.css'
import "./../../newsapi/NewsCard/NewsCard.css"
import React, {useEffect, useState} from "react";
import {loadNewsById, placeLike, placeLikeToCurrentNews, showNewsAdded} from "../../../store/actions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {requestSender} from "../../../fetch/RequestSender";
import CommentAddedAlert from "../alert/CommentAddedAlert";
import {Favorite, FavoriteBorder} from "@material-ui/icons";

const News = ({newsItem}) => {
  const dispatch = useDispatch()

  function like(newsId){
    requestSender.placeOrRemove(newsId).then(
      response => {
        dispatch(placeLikeToCurrentNews(response))
      }
    )
  }

  const fullDate = new Date(newsItem.publishedAt);
  const date = fullDate.toString().split(" ");
  const hour = parseInt(date[4].substring(0, 2));
  const time = hour > 12;
  return (
    <>
      <div className="newsCard">
        <NavLink to={'/news/' + newsItem.id }>
          <img
            alt={"title"}
            src={
              newsItem.urlToImage
                ? newsItem.urlToImage
                :
                "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1"
            }
            className="newsImage"
          />
        </NavLink>
        <div className="newsText">
          <div>
            <span className="title">{newsItem.title}</span>
            <br />
            <span className="author">
              <span className="muted">
              {" "}
                by {newsItem.author ? newsItem.author : "unknown"} /{" "}
                {time
                  ? `${hour - 12}:${date[4].substring(3, 5)} pm`
                  : `${hour}:${date[4].substring(3, 5)} am`}{" "}
                on {date[2]} {date[1]} {date[3]}, {date[0]}
            </span>
          </span>
          </div>
          <div className="lowerNewsText">
            <div className="description">
              {newsItem.content}
            </div>
            <div className="row-reverse">
              <FormControlLabel className="flex-right"
                                control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                                                   name="checkedH"
                                                   checked={newsItem.liked}
                                                   onClick={() => like(newsItem.id)}/>}
                                label={newsItem.likesCount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const NewsDetailsPage = () => {
  const { newsId } = useParams();
  const news = useSelector(state => state.news.currentNews)
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  useEffect( () => {
    dispatch(loadNewsById(newsId))
  },[])
  function postComment(commentBody){
    requestSender.saveComment(commentBody).then(
      (response) => {
        console.log(response)
        setContent('')
        dispatch(showNewsAdded())
      }
    )
  }

  return (
    <>
      <PrimarySearchAppBar/>
      <Container maxWidth="md" className='main'>
        {news && <News newsItem={news}/>}
        <form
              noValidate
              encType="multipart/form-data">
          <Grid container
                spacing={2}>
            <Grid item
                  xs={12}>
              <TextField style={{marginTop: '10px', marginBottom: '10px'}}
                onChange={event => setContent(event.target.value)}
                variant="outlined"
                required
                fullWidth
                id="content"
                label="write comment"
                name="content"
                value={content}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {postComment({comment:{content}, newsId})}}
          >
            Add comment
          </Button>
          <CommentAddedAlert/>
        </form>
        <CommentList/>
      </Container>
      <Footer />
    </>)
}

export default NewsDetailsPage