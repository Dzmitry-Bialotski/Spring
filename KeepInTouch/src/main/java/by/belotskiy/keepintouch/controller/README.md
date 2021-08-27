<h1> REST API </h1>

<h2>Methods for News:</h2>
<ul>
    <li> GET    /news?page={}&size={}$sort={}    -  get all </li>  
    <li> GET    /news/author/{authorId}?page={}&size={}$sort={} -  get all by author id </li>
    <li> GET    /news/{newsId}           -  get by id </li>
    <li> POST   /news                    -  save news  </li>
    <li> PUT    /news                    -  update news  </li>
    <li> DELETE /news/{newsId}           -  delete news by id</li>
</ul>

<h2>Methods for Comment:</h2>
<ul>
    <li> GET    /comments?page={}&size={}$sort={}             -  get all comments</li>  
    <li> GET    /comments/{newsId}?page={}&size={}$sort={}    -  get comments of the news</li>  
    <li> GET    /comment/{commentId}                  -  get by id </li>
    <li> POST   /comment                              -  save comment </li>
    <li> PUT    /comment                              -  update comment </li>
    <li> DELETE /comment/{commentId}                  -  delete comment by id</li>
</ul>

<h2> Methods for Likes (LikeController):</h2> 
<ul>
    <li> POST /like/{newsId}    -  place/remove like to news by id </li>
</ul>

<h2> Methods for Authentication (AuthController): </h2>
<ul>
<li> POST /register </li>
<li> POST /auth     </li>
</ul>
