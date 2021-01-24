import React from 'react';

export const GuardLoginPage = () => {
  return (
    <section>
      <h2 id="login-page-title">Login Page Title</h2>;
      <div>
        <input type="text" placeholder="Enter login" />
      </div>
      <div>
        <input type="password" placeholder="Enter password" />
      </div>
      <button>Click to login!</button>
    </section>
  );
};
