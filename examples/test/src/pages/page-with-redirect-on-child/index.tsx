import React from 'react';
import { Link } from 'react-router-dom';
import { ParentComponentWithChildRoutes, ChildRoutes } from '../../reactRouterAdvance';
import { StyledDiv } from '../../components/styled-div';

export const PageWithRedirectOnStaticChild = () => {
  return (
    <StyledDiv>
      <h2 id="page-with-redirect-on-static-child">Target static child page</h2>
      <Link to="/">Link to home</Link>
      <br />
      <Link to="/page-with-redirect-on-static-child/static-child">Link to first child</Link>
      <Link to="/page-with-redirect-on-static-child/second-static-child">Link to second-static-child</Link>
      <div className="children-content">
        {/*<ChildRoutes></ChildRoutes>*/}
      </div>
    </StyledDiv>
  );
};
