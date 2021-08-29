import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RequestSender from './fetch/RequestSender'

let requestSender = new RequestSender()
requestSender
  .auth({
    login: "dimasiandro",
    password: "1234"
  })
  .then((res) => {
    console.log('auth result: ', res)
    // requestSender.token = res.token
    // requestSender.saveNews({
    //   title: "news",
    //   sourceName: "source",
    //   content: "that`s some content about news",
    //   description: "that`s some description about news"
    // }).then((res) => {
    //     console.log('saved news: ', res)
    //})
  })



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);