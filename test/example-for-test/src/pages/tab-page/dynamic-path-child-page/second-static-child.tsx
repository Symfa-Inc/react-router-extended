import React from 'react';
import { Link } from 'react-router-dom';
import { StyledDiv } from '../../../components/styled-div';

export const DynamicParentSecondStaticChild = () => {
  return (
    <StyledDiv>
      <Link to="/">Back to home page</Link>
      <h2 id="dynamic-parent-static-child">Dynamic-parent-second-static-child</h2>
    </StyledDiv>
  );
};
