// next.config.js

const withPreconstruct = require('@preconstruct/next');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const webpack = require('webpack');

const ENV = 'test';

let SERVER_URL = 'https://abule-api.herokuapp.com';
let DOMAIN = 'https://www.abule.io';
const MARKER_DESTINATION = '61a0b8e235c93b2218fa021f';

if (ENV === 'test') {
  // SERVER_URL = 'https://abule-api.herokuapp.com';
  SERVER_URL = 'https://abule-api-test.herokuapp.com';
  DOMAIN = 'https://main-main.dz73g287cl09m.amplifyapp.com/';
} else if (ENV === 'dev') {
  // SERVER_URL = 'https://abule-api-test.herokuapp.com';
  SERVER_URL = 'http://localhost:7500';
  DOMAIN = 'http://localhost:3000';
}

module.exports = withPreconstruct(
  withCss(
    withSass(
      withLess({
        /* config options here */
        webpack(config) {
          config.plugins.push(
            new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery',
            }),
          );
          return config;
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js'],
        },
        env: {
          // TEST_ENV: true,
          ENV,
          MARKER_DESTINATION,
          SERVER_URL,
          REACT_APP_API: `${SERVER_URL}/api/v1`,
          TRANSLOADIT_API: 'https://api2.transloadit.com',
          GOOGLE_CLIENT_ID:
            '12161068993-aq7djlco6h7k12ler0oncm54d8t9hkh9.apps.googleusercontent.com',
          FACEBOOK_APP_ID: '845113655896637',
          PORT: '8080',
          APP_URL: '',
          FULL_APP_URL: `${DOMAIN}`,
          MOBILE_PORTRAIT_BREAKPOINT: 430,
          MOBILE_BREAKPOINT: 767,
          IPAD_MINI_BREAKPOINT: 875,
          IPAD_PORTRAIT_BREAKPOINT: 1024,
          IPAD_BREAKPOINT: 1400,
          GOOGLE_ANALYTICS_TRACKING_ID: 'UA-167865763-1',
          HERE_API_KEY: 'rFKMaR8_9ctkHo2jepE8Wrd3QBjZlZNU9niWqUD73wU',
          STRIPE_PUBLIC_KEY:
            'pk_live_51HMgFYGynOs4ctyYlHXKxeFJWCiIVzEo4gQ2Ho1op3dk4OcsQOpZYX0iKx9pN7o8ALXezn2sTQ87lsUMm7EIkXkj00RiZ2G5Gf',
        },
      }),
    ),
  ),
);
