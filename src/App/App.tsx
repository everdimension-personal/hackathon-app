import React, { useEffect } from 'react';
import { SlotFillProvider, Fill } from '@wordpress/components';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '../styles.css';
import { useUserStore } from '../data/userStore';
import { Authentication } from '../Authentication/Authentication';
import { Layout } from '../Layout/Layout';
import { RegistryList } from '../RegistryList/RegistryList';
import { RegistryPage } from '../RegistryPage/RegistryPage';

function App() {
  useEffect(() => {
    // cont
    fetch('/api/orgs/octokit/repos')
      .then((r) => r.json())
      .then(console.log);
  });
  const [user] = useUserStore();
  if (!user) {
    return;
  }
  return (
    <>
      <Layout />
      <RegistryList />
      <RegistryPage />
    </>
  );
}

export function render() {
  ReactDOM.render(
    <SlotFillProvider>
      <BrowserRouter>
        <Authentication>
          <App />
        </Authentication>
      </BrowserRouter>
    </SlotFillProvider>,
    document.getElementById('root'),
  );
}
