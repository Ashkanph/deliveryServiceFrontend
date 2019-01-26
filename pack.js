{
  "name": "FrontendDeliveryService",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.7.0",
    "react-dom": "^15.6.2",
    "react-toastify": "^4.5.2",
    "redux": "^4.0.1",
    "redux-logger": "^3.0.6",
    "semantic-ui-react": "^0.84.0"
  },
  "scripts": {
    "dev": "webpack-dev-server --config webpack.config.dev.js --watch --open",
    "build": "webpack -p --config webpack.config.prod.js"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.5",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "css-loader": "^2.1.0",
    "mini-css-extract-plugin": "^0.5.0",
    "react-router-dom": "^4.2.2",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.1.14",
    "webpack-watch-server": "^1.2.1"
  }
}
