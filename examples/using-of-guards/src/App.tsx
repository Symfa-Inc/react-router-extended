import { createBrowserHistory } from 'history';
import React from 'react';
import { Link, Router, Switch, useHistory } from 'react-router-dom';
import { ExtendedRoute, Guard } from './reactRouterAdvance';

export const browserHistory = createBrowserHistory();

class LoginGuard implements Guard {
  canActivate(): boolean {
    return localStorage.getItem('userAuthInfo') !== null;
  }
}

const HomePageRoute = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };
  return (
    <section>
      <h2>Home page!</h2>
      <div>
        <Link to="/login">Login page</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

const LoginPage = () => {
  const history = useHistory();
  const handleLogin = () => {
    localStorage.setItem('userAuthInfo', 'true');
    history.push('/');
  };
  return (
    <section>
      <div>
        <input type="text" placeholder="Enter login" />
      </div>
      <div>
        <input type="password" placeholder="Enter password" />
      </div>
      <div>
        <Link to="/">Home page</Link>
      </div>
      <button onClick={handleLogin}>Click to login!</button>
    </section>
  );
};

const App = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <ExtendedRoute
          component={HomePageRoute}
          path="/"
          redirectUrl="/login"
          exact={true}
          guards={[new LoginGuard()]}
        />
        <ExtendedRoute component={LoginPage} path="/login" exact={true} />
      </Switch>
    </Router>
  );
};

export default App;
