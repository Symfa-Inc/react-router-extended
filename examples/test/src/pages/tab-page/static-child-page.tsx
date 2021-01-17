import React from 'react';
import { StyledDiv } from '../../components/styled-div';
import { MockUserData } from '../../models/mock-user-data';

interface Props {
  mockUiData: { color: string };
  mockUserData: MockUserData;
}

export const StaticChild = () => {
  console.log('CHILD!');
  return (
    <StyledDiv>
      <h2 id="static-child">Static-child</h2>
      <div>
        {/*<p id="name">{mockUserData.name}</p>*/}
        {/*<p id="last-name">{mockUserData.lastName}</p>*/}
      </div>
      {/*<div id="ui-data">{mockUiData.color}</div>*/}
    </StyledDiv>
  );
};
