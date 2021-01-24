import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const ChildGuardConsistencyWork = () => {
  const ref = useRef(0);
  ref.current += 1;
  const element = document.getElementById('insert-place');
  if (element) {
    element.innerHTML += 'child rendered once!';
  }
  return (
    <section>
      <h2 id="child-title">Child title</h2>
      <Link to="/guards-consistency-work" id="child-link">
        Link to parent
      </Link>
    </section>
  );
};
