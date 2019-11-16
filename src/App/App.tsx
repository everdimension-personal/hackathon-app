import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'normalize.css';
import { useUserStore } from '../data/userStore';
import { Authentication } from '../Authentication/Authentication';

function App() {
  useEffect(() => {
    fetch('/api/orgs/octokit/repos')
      .then((r) => r.json())
      .then(console.log);
  });
  const [user] = useUserStore();
  if (!user) {
    return;
  }
  return <h2>hello!</h2>;
}

export function render() {
  ReactDOM.render(
    <BrowserRouter>
      <Authentication>
        <App />
      </Authentication>
    </BrowserRouter>,
    document.getElementById('root'),
  );
}
