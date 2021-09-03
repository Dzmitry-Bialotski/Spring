import NavBar from "./Navbar/Navbar";
import NewsContent from "./NewsContent/NewsContent";
import {useEffect, useState} from "react";
import axios from "axios";
import Footer from "../Footer/CustomFooter";

const NewsApi = () => {

  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  const [category, setCategory] = useState("general");

  const newsApi = async () => {
    try {
      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=2d21af9d8dbd4b23b87fcea6245aeeba&pageSize=${loadMore}&category=${category}`
      );
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    newsApi().then(r => console.log(r));
  }, [newsResults, loadMore, category]);

  return (
    <>
    <NavBar setCategory={setCategory}/>
    {newsResults && (
      <NewsContent
        newsArray={newsArray}
        newsResults={newsResults}
        loadMore={loadMore}
        setLoadMore={setLoadMore}
      />)
    }
    <Footer />
  </>)
}

export default NewsApi