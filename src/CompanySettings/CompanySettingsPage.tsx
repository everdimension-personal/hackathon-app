import React from 'react';
import { Route } from 'react-router-dom';
import { Page } from '../Page/Page';
import { CompanySettings } from './CompanySettings';

export const CompanySettingsPage: React.FunctionComponent<{}> = () => {
  return (
    <Route
      path="/company/:contractId"
      render={({ match }) => (
        <Page>
          <CompanySettings contractId={match.params.contractId} />
        </Page>
      )}
    />
  );
};
