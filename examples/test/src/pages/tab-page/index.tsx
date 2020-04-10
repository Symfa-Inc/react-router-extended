import React from 'react';
import { Link } from 'react-router-dom';
import { ParentComponentWithChildRoutes } from '../../../../../src/reactRouterAdvance';
import { StyledDiv } from '../../components/styled-div';

export const TabPage = ({ childRoutes }: ParentComponentWithChildRoutes) => {
  return (
    <StyledDiv>
      <h2 id="tab-page">Tab page</h2>
      <Link to="/">Link to home</Link>
      <br />
      <Link to="/tab-page/static-child">Link to static-child</Link>
      <Link to="/tab-page/second-static-child">Link to second-static-child</Link>
      <Link to="/tab-page/dynamic-path-child-page/1234">Link to dynamic-path-child-page</Link>
      <div className="children-content">{childRoutes}</div>
    </StyledDiv>
  );
};
