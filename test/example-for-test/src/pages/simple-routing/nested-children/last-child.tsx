import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const LastChild = () => {
  const ref = useRef(0);
  ref.current += 1;
  return (
    <section>
      <h2 id="last-child-title">Last Child</h2>
      <Link to="/simple-routing/nested-child/nested-child2">Link to parent route</Link>
      <div id={'last-child-counter'}>{ref.current}</div>
    </section>
  );
};
