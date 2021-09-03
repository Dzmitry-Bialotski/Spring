const {loadStripe} = require("@stripe/stripe-js");
export const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};
export const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');