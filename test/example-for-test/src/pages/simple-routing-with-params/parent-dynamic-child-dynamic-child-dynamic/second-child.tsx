import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const SecondChildWithParamsDynamicParentDynamicChildDynamicChild = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="second-child-title">Second Child</h2>
      <Link to="/routing-with-params-dynamic-child-dynamic-parent">Link to parent route</Link>
      <div id={'second-child-counter'}>{ref.current}</div>
    </section>
  );
};
