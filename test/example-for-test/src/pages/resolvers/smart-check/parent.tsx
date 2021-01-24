import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const ParentResolverSmartCheck = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-1-title">Parent Title</h2>
      <Link to="/resolver-smart-check/parent-with-resolvers" id="parent-1-link">
        Link to nested child 1
      </Link>
      <div id={'parent-1-counter'}>{ref.current}</div>
      <div id="insert-place" />
      <ChildRoutes />
    </section>
  );
};
