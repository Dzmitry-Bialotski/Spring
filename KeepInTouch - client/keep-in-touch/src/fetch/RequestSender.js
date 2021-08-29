class RequestSender {

    constructor(_token = "") {
      this._token = _token
      this._hostname = "http://localhost:8081/"
    }

  get token() {
    return this._token
  }

  set token(token) {
    this._token = token
  }

  get hostname() {
    return this._hostname
  }

  async sendRequest(method, url, body = {}) {
    const response = await fetch(this.hostname + url, {
      method: method,
      headers: {
        "Content-type": 'application/json',
        "Authorization": `Bearer ${this.token}`
      },
      body: JSON.stringify(body)
    })

    return await response.json();
  }
  /**fetch api from auth controller*/

  async register(registerRequestBody) {
    return await this.sendRequest('POST', 'register', registerRequestBody)
  }

  async auth(authRequestBody){
    return await this.sendRequest('POST', 'auth', authRequestBody)
  }

  /**fetch api from news controller*/

  async getNews(title = '', page = '', size = '', sort = ''){
    return await this.sendRequest('GET', `news?title=${title}&page=${page}&size=${size}&sort=${sort}`)
  }

  async getNewsById(id){
    return await this.sendRequest('GET', `news/${id}`)
  }

  async getNewsByAuthorId(authorId){
    return await this.sendRequest('GET', `news/author/${authorId}`)
  }

  async saveNews(news){
    return await this.sendRequest('POST', 'news/', news)
  }

  async updateNews(news){
    return await this.sendRequest('PUT', 'news/', news)
  }

  async deleteNews(newsId){
    return await this.sendRequest('DELETE', `news/${newsId}`)
  }

  /**fetch api from comments controller*/

  async getCommentsById(id){
    return await this.sendRequest('GET', `comments/${id}`)
  }

  async getCommentsByNewsId(newsId, page, size, sort){
    return await this.sendRequest('GET', `comments/news/${newsId}?page=${page}&size=${size}&sort=${sort}`)
  }

  async getAllComments(page, size, sort){
    return await this.sendRequest('GET', `comments/news?page=${page}&size=${size}&sort=${sort}`)
  }

  async saveComment(commentBody){
    return await this.sendRequest('POST', 'comments/', commentBody)
  }

  async updateComment(comment){
    return await this.sendRequest('PUT', 'comments/', comment)
  }

  async deleteComment(commentId){
    return await this.sendRequest('DELETE', `comments/${commentId}`)
  }

  /**fetch api from likes controller*/

  async placeOrRemove(newsId){
    return await this.sendRequest('POST', `likes/${newsId}`)
  }

}

export default RequestSender;