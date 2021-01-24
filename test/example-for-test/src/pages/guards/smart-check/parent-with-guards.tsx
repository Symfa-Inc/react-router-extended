import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const ParentWithGuardsGuardSmartCheck = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-2-title">Parent Title</h2>
      <Link to="/guards-smart-check/parent-with-guards/child-1" id="parent-2-link-1">
        Link to nested child 1
      </Link>
      <Link to="/guards-smart-check/parent-with-guards/child-2" id="parent-2-link-2">
        Link to nested child 2
      </Link>
      <Link to="/guards-smart-check" id="parent-2-parent-link">
        Link to parent
      </Link>
      <div id={'parent-2-counter'}>{ref.current}</div>
      <ChildRoutes />
    </section>
  );
};
