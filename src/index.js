
import 'core-js/es6/map';
import 'core-js/es6/set';
import React from "react";
import reactDom from "react-dom";
import "babel-polyfill";

import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store } from "./store/store";
import Routes from "./routing/routes.js";
import history from "./routing/components/history";
import { ToastContainer } from 'react-toastify';


// This only be loaded in the development mode
require('./style/index.scss');

const app = document.getElementById("app");

// const options = {
//   position: "bottom left",
//   timeout: 5000,
//   offset: "30px",
//   transition: "scale"
// };

reactDom.render(
  <div>
     <ToastContainer
        autoClose={5000}
        hideProgressBar = {true}
        newestOnTop={false}
        closeOnClick
        pauseOnVisibilityChange={true}
        draggable
        pauseOnHover
        />
    <Provider store={store}>
        <Router history={history}>
            <Routes />
        </Router>
    </Provider>
  </div>,
  app
);