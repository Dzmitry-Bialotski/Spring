import {BrowserRouter as Router, Route} from "react-router-dom";
import NewsApi from "./components/newsapi/NewsApi";
import LoginPage from "./components/news/pages/LoginPage";
import RegisterPage from "./components/news/pages/RegisterPage";
import NewsPage from "./components/news/pages/NewsPage";
import NewsDetailsPage from "./components/news/pages/NewsDetailsPage";
import NotFound from "./components/news/pages/error/NotFound";
import AddNewsPage from "./components/news/pages/AddNewsPage";
import StripePage from "./components/news/pages/StripePage";

function App() {
  return (
    <Router>
      <Route path='/news-api' component={NewsApi}/>
      <Route exact path={['/news','/']} component={NewsPage}/>
      <Route path='/news/add' component={AddNewsPage}/>
      <Route path={['/news/id/:newsId']} component={NewsDetailsPage}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/register' component={RegisterPage}/>
      <Route path='/stripe' component={StripePage}/>
      <Route component={NotFound} />
    </Router>
  );
}

export default App;
