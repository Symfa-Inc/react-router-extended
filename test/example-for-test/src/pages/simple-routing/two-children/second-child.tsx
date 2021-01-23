import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const SecondChild = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="second-child-title">Second Child Title</h2>
      <Link to="/simple-routing-two-children" id="second-child-link">Link to parent</Link>
      <div id={'second-child-counter'}>{ref.current}</div>
    </section>
  );
};
