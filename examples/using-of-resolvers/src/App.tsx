import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { ExtendedRouter, Resolver, sleep, useResolver } from './reactRouterAdvance';
import { createBrowserHistory } from 'history';

interface UserInfo {
  name: string;
  color: string;
}

export const browserHistory = createBrowserHistory();

class HomePageResolver implements Resolver {
  async resolve(): Promise<UserInfo> {
    await sleep(500);
    return { name: 'Joe', color: 'green' };
  }
}

const HomePageRoute = () => {
  const resolversInfo = useResolver<{ userInfo: UserInfo }>();
  return (
    <section>
      <h2>Home page!</h2>
      <p>{resolversInfo.userInfo.name}</p>
      <p>{resolversInfo.userInfo.color}</p>
    </section>
  );
};

const App = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <ExtendedRouter
          component={HomePageRoute}
          path="/"
          resolvers={{
            userInfo: new HomePageResolver(),
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
