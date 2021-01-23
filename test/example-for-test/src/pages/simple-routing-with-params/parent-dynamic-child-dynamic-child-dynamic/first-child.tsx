import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChildRoutes } from '../../../reactRouterAdvance';

export const FirstChildWithParamsDynamicParentDynamicChildDynamicChild = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="first-child-title">First Child</h2>
      <Link to="/routing-with-params-dynamic-child-dynamic-parent-dynamic-child/1234">Link to parent route</Link>
      <Link to="/routing-with-params-dynamic-child-dynamic-parent-dynamic-child/1234/1234/1234" id="first-child-link">
        First Child Link
      </Link>
      <div id={'first-child-counter'}>{ref.current}</div>
      <ChildRoutes />
    </section>
  );
};
