import React from 'react';
import { Link } from 'react-router-dom';

import { StyledDiv } from '../../../components/styled-div';

export const DynamicParentStaticChild = () => {
  return (
    <StyledDiv>
      <Link to="/">Back to home page</Link>
      <h2 id="dynamic-parent-static-child">Dynamic-parent-static-child</h2>
    </StyledDiv>
  );
};
