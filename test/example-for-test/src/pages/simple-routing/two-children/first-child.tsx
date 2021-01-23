import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const FirstChild = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="first-child-title">First Child Title</h2>
      <Link to="/simple-routing-two-children" id="first-child-link">Link to parent</Link>
      <div id={'first-child-counter'}>{ref.current}</div>
    </section>
  );
};
