import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const ParentGuardSmartCheck = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-1-title">Parent Title</h2>
      <Link to="/guards-smart-check/parent-with-guards" id="parent-1-link">
        Link to nested child 1
      </Link>
      <div id={'parent-1-counter'}>{ref.current}</div>
      <div id="insert-place" />
      <ChildRoutes />
    </section>
  );
};
