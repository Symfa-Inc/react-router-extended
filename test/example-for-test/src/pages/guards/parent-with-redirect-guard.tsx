import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../reactRouterAdvance';

export const ParentWithRedirect = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-title">Parent Title</h2>
      <Link to="/guards-check-failed-with-redirect/1234/child-with-guards" id="parent-link">
        Link to nested child 1
      </Link>
      <div id={'parent-counter'}>{ref.current}</div>
      <div id="insert-place" />
      <ChildRoutes />
    </section>
  );
};
