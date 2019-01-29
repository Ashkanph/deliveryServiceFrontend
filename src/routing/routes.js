import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getPropertyValue } from "../functions/common";
import { checkAccess } from "../functions/access";
import { store } from "../store/store";
import { showErrorMessage } from "../functions/notificationHandling";
import {pages} from "../consts";
import {userInfo} from "../store/actions/data";

import Login from "./routes/login";
import Parcels from "./routes/parcels";
import Shipments from "./routes/shipments";


class Routes extends Component {

  render() {
    return (
      <Switch>
        <LoginRoute   path="/" exact component={Login} />
        <LoginRoute   path={pages.login.hash} exact component={Login} />

        <PrivateRoute pageName="parcels"
                      path={pages.parcels.hash} component={Parcels} />
        <PrivateRoute pageName="shipments"
                      path={pages.shipments.hash} component={Shipments} />
      </Switch>
    );
  }
}

const PrivateRoute =({ component: Component, pageName: pageName, ...rest }) =>{
//   handleSideBar(true)
// console.warn(store.data);

  return (
    <Route
      {...rest}
      render={props =>{
          let loggedIn = userInfo() != null,
              defaultPage = pages[getPropertyValue(userInfo(), "role") + "DefaultPage"],
              access   = checkAccess(pageName);

          let result= (loggedIn === true) ? (
            access ?
              <Component {...props} />
              : <Redirect
                  to={{
                    pathname: defaultPage,
                  }}
                />
          ) : (
            <Redirect
              to={{
                pathname: pages.login.hash,
              }}
            />
          );

          if(loggedIn && !access){
            console.log(`No access to this poage: ${pageName}`);
            showErrorMessage('dontHaveAccess');
          }

          return result;

        }
      }
    />
  );
}

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>{
      let loggedIn = userInfo() != null,
          defaultPage = pages[getPropertyValue(userInfo(), "role") + "DefaultPage"],
          result    = (loggedIn === false) ? (
                          <Component {...props} />
                          ) : (
                            <Redirect
                              to={{
                                pathname: defaultPage
                              }}
                            />);

            return result;
      }}
  />
);

export default Routes;