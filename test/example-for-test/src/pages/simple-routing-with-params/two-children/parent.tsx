import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const ParentWithTwoChildrenDynamic = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-title">Parent title</h2>
      <Link to="/routing-with-params-two-children/1234/first-child" id="parent-link-1">
        Link to nested child 1
      </Link>
      <Link to="/routing-with-params-two-children/1234/second-child" id="parent-link-2">
        Link to nested child 2
      </Link>
      <div id={'parent-counter'}>{ref.current}</div>
      <ChildRoutes />
    </section>
  );
};
