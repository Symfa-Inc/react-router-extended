import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const ParentWithTwoChildren = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-title">Parent title</h2>
      <Link to="/simple-routing-two-children/first-children" id="parent-link-1">
        Link to nested child 1
      </Link>
      <Link to="/simple-routing-two-children/second-children" id="parent-link-2">
        Link to nested child 2
      </Link>
      <div id={'parent-counter'}>{ref.current}</div>
      <ChildRoutes />
    </section>
  );
};
