import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Page } from '../Page/Page';
import { CompanySettings } from './CompanySettings';
import { useCompanySettings } from '../data/companySettingsStore';
import { useUserStore } from '../data/userStore';
import { loadFieldPresentation, saveFieldPresentation } from '../data/registry';

export const CompanySettingsPage: React.FunctionComponent<{}> = () => {
  const [user] = useUserStore();
  const [companySettings, setCompanySettings] = useCompanySettings();
  useEffect(() => {
    const saved = loadFieldPresentation(user);
    if (saved) {
      setCompanySettings(saved);
    }
  }, []);
  useEffect(() => {
    saveFieldPresentation(companySettings, user);
  }, [companySettings, user]);
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
