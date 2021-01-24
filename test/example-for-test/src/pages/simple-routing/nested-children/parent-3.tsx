import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const SimpleRoutingParent3 = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-3-title">Parent Title 3</h2>
      <div>
        <Link to="/simple-routing/nested-child">Link to parent route</Link>
      </div>
      <Link to="/simple-routing/nested-child/nested-child2/nested-child3" id="parent-3-link">Parent Link 3</Link>
      <div id={'parent-3-counter'}>{ref.current}</div>
      <ChildRoutes />
    </section>
  );
};
