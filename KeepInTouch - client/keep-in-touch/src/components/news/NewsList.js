import {Container} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import News from "./News";
import {useDispatch, useSelector} from "react-redux";
import {loadNews} from "../../store/actions";

const NewsList = () => {
  const news = useSelector(state => state.news.news)
  const size = useSelector(state => state.news.size)
  const page = useSelector(state => state.news.page)
  const title = useSelector(state => state.news.title)
  const canLoadMore = useSelector(state => state.news.canLoadMore)
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(loadNews(title, page, size))
  },[])

  function loadMore(){
    dispatch(loadNews(title, page + 1, size))
  }
  return (
    <>
      <Container maxWidth="md" className='main'>
        <div className="content">
          {
            news ? news.map((newsItem) =>
                <News newsItem={newsItem} key={newsItem.id}/>
              ) : "No news available"
          }
          {canLoadMore &&
            <>
              <hr />
              <button
                className="loadMore"
                onClick={loadMore}
              >
                Load More
              </button>
            </>
          }
          </div>

      </Container>
    </>
  )
}

export default NewsList