import React from 'react';
import { Link, Router, Switch } from 'react-router-dom';
import { ExtendedRouter, ChildRoutes } from './reactRouterAdvance';
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

const HomePageRoute = () => {
  return (
    <section>
      <h2>Welcome to the home page!</h2>
      <div>
        <Link to="/">Link to home page</Link>
      </div>
      <div>
        <Link to="/about">Link to about page</Link>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <section>
      <h2>Welcome to the about page!</h2>
      <div>
        <Link to="/">Link to home page</Link>
      </div>
      <div>
        <Link to="/about/about-us">Link to about us page</Link>
      </div>
      <div>
        <Link to="/about/about-company">Link to about company page</Link>
      </div>
      <section>
        Under this section nested children should be rendered once you hit the nested path!
        <ChildRoutes />
      </section>
    </section>
  );
};

export const AboutUsPage = () => {
  return <h2>Welcome to sub (about us page) page of about page!</h2>;
};
export const AboutCompanyPage = () => {
  return (
    <section>
      <h2>Welcome to sub (about company page) page of about page!</h2>
      <div>
        <Link to="/about/about-company/news">Link to news page!</Link>
      </div>
    </section>
  );
};
export const AboutCompanyNewsPage = () => {
  return <h2>Welcome to sub (about company page) page of about page!</h2>;
};

const App = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <ExtendedRouter path="/" exact={true} component={HomePageRoute} />

        <ExtendedRouter path="/about" component={AboutPage}>
          <ExtendedRouter path="/about-us" component={AboutUsPage} />

          <ExtendedRouter path="/about-company" component={AboutCompanyPage}>
            <ExtendedRouter path="/news" component={AboutCompanyNewsPage} />
            {/*  You can keep nesting if you need so*/}
          </ExtendedRouter>
        </ExtendedRouter>
      </Switch>
    </Router>
  );
};

export default App;
