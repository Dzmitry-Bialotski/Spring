import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Elements} from "@stripe/react-stripe-js";
import {ELEMENTS_OPTIONS, stripePromise} from "./stripe/stripe";

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
