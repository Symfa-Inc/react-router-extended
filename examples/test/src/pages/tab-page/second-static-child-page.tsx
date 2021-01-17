import React, { useEffect } from 'react';
import { StyledDiv } from '../../components/styled-div';
import { useResolver } from '../../reactRouterAdvance';

export const SecondStaticChild = () => {
  const resolverInfo = useResolver();

  useEffect(() => {
    console.log('resolverInfo', resolverInfo);
  }, []);
  return (
    <StyledDiv>
      <h2 id="second-static-child">Second Static-child</h2>
      <div>
        {/*<p id="name">{mockUserData.name}</p>*/}
        {/*<p id="last-name">{mockUserData.lastName}</p>*/}
      </div>
      {/*<div id="ui-data">{mockUiData.color}</div>*/}
    </StyledDiv>
  );
};
