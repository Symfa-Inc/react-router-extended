import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { ExtendedRouter } from './reactRouterAdvance';
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

const HomePageRoute = () => {
  return <h2>Home page!</h2>;
};

const App = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <ExtendedRouter component={HomePageRoute} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
