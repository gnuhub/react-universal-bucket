import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from './redux/modules/auth';
import {
    App,
    Home,
    Login,
    LoginSuccess,
    Widget,
    Pagination,
    Counter,
    About
  } from './containers';
//getRoutes(store)
export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   *   
   */
  return (
      {
        path:"/",
        component:App,
        indexRoute: { component: Home },
        childRoutes: [
          {
            path:"login",
            component:Login
          },
          {
            path:"counter",
            component:Counter
          },
           {
            path:"loginsuccess",
            component:Login
          },
          {
            path:"pagination",
            component:Pagination
          },
          {
            path:"about",
            component:About
          },
           {
            path:"widget",
            component:Widget
          }
        ]
      }
     
  )
};
