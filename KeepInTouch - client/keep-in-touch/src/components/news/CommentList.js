import React, {useEffect} from "react";
import {Comment} from "./Comment";
import {useDispatch, useSelector} from "react-redux";
import {loadComments, loadNews} from "../../store/actions";
import {useParams} from "react-router-dom";
import './../newsapi/NewsContent/NewsContent.css'

export default function CommentList() {
  const { newsId } = useParams();
  const comments = useSelector(state => state.comment.comments)
  const size = useSelector(state => state.news.size)
  const page = useSelector(state => state.news.page)
  const canLoadMore = useSelector(state => state.comment.canLoadMore)
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(loadComments(newsId, page, size))
  },[])

  function loadMore(){
    dispatch(loadComments(newsId, page + 1, size))
  }

  return (
    <div style={{ padding: 14 }} className="content">
      {
        comments ? comments.map((commentItem) =>
          <Comment commentItem={commentItem} key={commentItem.id}/>
        ) : "No comments"
      }
      {canLoadMore &&
      <>
        <button
          className="loadMore loadMore-comment"
          onClick={loadMore}
        >
          Load More
        </button>
      </>
      }

    </div>)
}