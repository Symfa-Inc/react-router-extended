import React from 'react';
import { Link } from 'react-router-dom';
import { StyledDiv } from '../../components/styled-div';
import { MockUserData } from '../../models/mock-user-data';
import { ChildRoutes } from '../../reactRouterAdvance';

interface Props {
  mockUiData: { color: string };
  mockUserData: MockUserData;
}

export const StaticChild = () => {
  console.log('CHILD!');
  return (
    <StyledDiv>
      <h2 id="static-child">Static-child</h2>
      <Link to="/tab-page/static-child/nested">Link to nested-child</Link>
      <div>
        {/*<p id="name">{mockUserData.name}</p>*/}
        {/*<p id="last-name">{mockUserData.lastName}</p>*/}
      </div>
      <ChildRoutes />
      {/*<div id="ui-data">{mockUiData.color}</div>*/}
    </StyledDiv>
  );
};
