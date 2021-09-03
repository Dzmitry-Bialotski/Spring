import Footer from "../../Footer/CustomFooter";
import PrimarySearchAppBar from "../Navbar";
import NewsList from "../NewsList";
import './page.css'
const NewsPage = () => {
  return (
    <div>
      <PrimarySearchAppBar/>
      <NewsList/>
      <Footer />
    </div>
  )
}

export default NewsPage