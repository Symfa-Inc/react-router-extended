import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const SimpleRoutingParent2 = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-2-title">Parent Title 2</h2>
      <div>
        <Link to="/simple-routing">Link to parent route</Link>
      </div>
      <Link to="/simple-routing/nested-child/nested-child2" id="parent-2-link">Parent 2 Link</Link>
      <div id={'parent-2-counter'}>{ref.current}</div>
      <ChildRoutes />
    </section>
  );
};
