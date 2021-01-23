import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const ChildWithParamsDynamicChildStaticParent = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="child-title">Child</h2>
      <Link to="/routing-with-params-dynamic-child-static-parent">Link to parent route</Link>
      <div id={'child-counter'}>{ref.current}</div>
    </section>
  );
};
