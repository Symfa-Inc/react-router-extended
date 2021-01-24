import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Child2GuardSmartCheck = () => {
  const ref = useRef(0);
  ref.current += 1;
  const element = document.getElementById('insert-place');
  if (element) {
    element.innerHTML += 'child rendered once!';
  }
  return (
    <section>
      <h2 id="child-2-title">Child title 2</h2>
      <Link to="/guards-smart-check" id="child-2-link">
        Link to parent
      </Link>
    </section>
  );
};
