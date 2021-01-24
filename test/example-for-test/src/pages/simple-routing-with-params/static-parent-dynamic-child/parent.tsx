import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const ParentWithParamsDynamicChild = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="parent-1-title">Parent Title 1</h2>
      <Link to="/routing-with-params-dynamic-child/1234" id="parent-1-link">
        Parent 1 Link
      </Link>
      <div id={'parent-1-counter'}>{ref.current}</div>
      <ChildRoutes />
    </section>
  );
};
