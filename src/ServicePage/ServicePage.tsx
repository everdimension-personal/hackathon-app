import React from 'react';
import { Fill } from '@wordpress/components';
import { Route } from 'react-router-dom';
import { ServicePageContent } from './ServicePageContent';

export const ServicePage: React.FunctionComponent = () => {
  return (
    <Route
      path="/registries/:id/services/:serviceId"
      render={({ match }) => (
        <Fill name="layoutBody">
          <ServicePageContent
            contractId={match.params.id}
            serviceId={match.params.serviceId}
          />
        </Fill>
      )}
    />
  );
};
