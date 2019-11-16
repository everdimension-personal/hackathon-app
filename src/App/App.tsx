import React, { useEffect } from 'react';
import { SlotFillProvider, Fill } from '@wordpress/components';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { FocusStyleManager } from "@blueprintjs/core";
import '../styles.css';
import { useUserStore } from '../data/userStore';
import { Authentication } from '../Authentication/Authentication';
import { Layout } from '../Layout/Layout';
import { RegistryListPage } from '../RegistryList/RegistryListPage';
import { RegistryPage } from '../RegistryPage/RegistryPage';
import { ServicePage } from '../ServicePage/ServicePage';
import { Transaction } from '../Transaction/Transaction';

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  const [user] = useUserStore();
  if (!user) {
    return;
  }
  return (
    <>
      <Layout />
      <RegistryListPage />
      <RegistryPage />
      <ServicePage />
      <Transaction />
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
