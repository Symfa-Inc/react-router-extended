import React from 'react';
import { Link } from 'react-router-dom';
import { ParentComponentWithChildRoutes } from '../../reactRouterAdvance';
import { StyledDiv } from '../../components/styled-div';
import { useState } from 'react';
import { ChildRoutes } from '../../reactRouterAdvance/index';

export const TabPage = ({ childRoutes }: ParentComponentWithChildRoutes) => {
  const [time] = useState(Date.now());
  console.log('PARENT!');
  return (
    <StyledDiv>
      <h2 id="tab-page">Tab page</h2>
      <p id="tab-time">{time}</p>
      <Link to="/">Link to home</Link>
      <br />
      <Link to="/tab-page/static-child">Link to static-child</Link>
      <Link to="/tab-page/second-static-child">Link to second-static-child</Link>
      <Link to="/tab-page/dynamic-path-child-page/1234">Link to dynamic-path-child-page</Link>
      <div className="children-content">
        <ChildRoutes></ChildRoutes>
      </div>
    </StyledDiv>
  );
};
