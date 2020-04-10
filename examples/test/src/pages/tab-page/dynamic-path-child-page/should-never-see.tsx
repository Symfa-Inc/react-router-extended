import React from 'react';
import { Link } from 'react-router-dom';

import { StyledDiv } from '../../../components/styled-div';

export const ShouldNeverSee = () => {
  return (
    <StyledDiv>
      <Link to="/">Back to home page</Link>
      <h2 id="should-never-see">Shoudl-never-see</h2>
    </StyledDiv>
  );
};
