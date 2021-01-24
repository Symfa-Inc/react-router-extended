import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes, useResolver } from '../../../reactRouterAdvance';

export const ParentWithResolversParentResolverSmartCheck = () => {
  const resolverInfo = useResolver<{ firstResolver: number; secondResolver: number }>();
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-2-title">Parent With Resolvers Title</h2>
      <Link to="/resolver-smart-check/parent-with-resolvers/child-1" id="parent-2-link-1">
        Link to nested child 1
      </Link>
      <Link to="/resolver-smart-check/parent-with-resolvers/child-2" id="parent-2-link-2">
        Link to nested child 2
      </Link>
      <Link to="/resolver-smart-check" id="parent-2-parent-link">
        Link to parent
      </Link>
      <h2 id="parent-2-first-resolver">{resolverInfo.firstResolver}</h2>
      <h2 id="parent-2-second-resolver">{resolverInfo.secondResolver}</h2>
      <div id={'parent-2-counter'}>{ref.current}</div>
      <ChildRoutes />
    </section>
  );
};
