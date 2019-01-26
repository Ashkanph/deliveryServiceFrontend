import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getPropertyValue } from "../functions/common";
import Login from "./routes/login";
import { checkAccess } from "../functions/access";
import { store } from "../store/store";
import { showErrorMessage } from "../functions/notificationHandling";
// import {handleSideBar} from "../store/actions/view";
import {pages} from "../consts";

class Routes extends Component {

  render() {
    return (
      <Switch>
        <LoginRoute   path="/" exact component={Login} />
        <LoginRoute   path={pages.login.hash} exact component={Login} />

        {/* <PrivateRoute pageName="users"
                      path={pages.users.hash} component={Users} /> */}
      </Switch>
    );
  }
}

const PrivateRoute =({ component: Component, pageName: pageName, ...rest }) =>{
//   handleSideBar(true)
  return (
    <Route
      {...rest}
      render={props =>{
          let loggedIn = getPropertyValue(store.getState(), 'user.loggedIn'),
              defaultPage = pages[getPropertyValue(store.getState(), "data.user.role") + "DefaultPage"],
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
        let loggedIn  = getPropertyValue(store.getState(), "data.loggedIn"),
            defaultPage = pages[getPropertyValue(store.getState(), "data.user.role") + "DefaultPage"],
            result    = (loggedIn === false) ? (
                          <Component {...props} />
                          ) : (
                            <Redirect
                              to={{
                                pathname: defaultPage
                              }}
                            />);

            // if(loggedIn != true)
            //   checkRememberMeAndLogin();

            return result;
      }}
  />
);

export default Routes;