import React from 'react';
import { useResolver } from '../../reactRouterAdvance';

interface MockUserData {
  name: string;
  lastName: string;
}

interface MockUiData {
  color: string;
}

export const PageWithResolvers = () => {
  const resolverInfo = useResolver<{ mockUserData: MockUserData; mockUiData: MockUiData }>();
  return (
    <section>
      <h2 id="page-title">Page with resolvers</h2>
      <h2 id="first-resolver-name">{resolverInfo.mockUserData.name}</h2>
      <h2 id="first-resolver-last-name">{resolverInfo.mockUserData.lastName}</h2>
      <h2 id="second-resolver-color">{resolverInfo.mockUiData.color}</h2>
    </section>
  );
};
