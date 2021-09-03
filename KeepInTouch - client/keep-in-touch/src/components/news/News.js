import React from "react";
import "./../newsapi/NewsCard/NewsCard.css"
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {useDispatch} from "react-redux";
import {placeLike} from "../../store/actions";
import {requestSender} from "../../fetch/RequestSender";
const News = ({newsItem}) => {

  const dispatch = useDispatch()

  function like(newsId){
    requestSender.placeOrRemove(newsId).then(
      response => {
        dispatch(placeLike(newsItem.id, response))
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
              {newsItem.description}
            </div>
            <div className="row">
              <NavLink to={'/news/id/' + newsItem.id }>
                <Typography variant="body2" color="inherit">
                  details
                </Typography>
              </NavLink>
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

export default News;