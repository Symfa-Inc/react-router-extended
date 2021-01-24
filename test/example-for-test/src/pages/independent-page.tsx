import React from 'react';
import { Link } from 'react-router-dom';
import { StyledDiv } from '../components/styled-div';

export const IndependentPage = () => {
  return (
    <StyledDiv>
      <h2 id="independent-page">Independant page</h2>
      <Link to="/">Back to home page</Link>
    </StyledDiv>
  );
};
