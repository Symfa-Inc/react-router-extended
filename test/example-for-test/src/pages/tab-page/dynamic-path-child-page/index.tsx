import React from 'react';
import { Link } from 'react-router-dom';
import { ParentComponentWithChildRoutes } from '../../../../src/reactRouterAdvance';
import { StyledDiv } from '../../../components/styled-div';

export const DynamicPathChildPage = ({ childRoutes }: ParentComponentWithChildRoutes) => {
  return (
    <StyledDiv>
      <br />
      <h2 id="dynamic-path-child-page">Dynamic-path-child-page</h2>
      <Link to="/tab-page/dynamic-path-child-page/555/static-child">Link to dynamic parent static child</Link>
      <Link to="/tab-page/dynamic-path-child-page/1233/second-static-child">
        Link to dynamic parent second static child
      </Link>
      <div>{childRoutes}</div>
    </StyledDiv>
  );
};
