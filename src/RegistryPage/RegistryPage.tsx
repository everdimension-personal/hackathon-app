import React from 'react';
import { Fill } from '@wordpress/components';
import { Route } from 'react-router-dom';
import { Registry } from './Registry/Registry';

interface Service {
  id: string;
  code: string;
  name: string;
}

interface Shipment {
  id: string;
  addressFrom: string;
  addressTo: string;
  services: Service[];
}

interface Registry {
  companyName: string;
  company: string;
  dateFrom: string;
  dateTo: string;
  regNumber: string;
  createdDate: string;
  shipments: Shipment[];
}

export const RegistryPage: React.FunctionComponent = () => {
  return (
    <Route
      path="/registries/:id"
      render={(props) => (
        <Fill name="layoutBody">
          <Registry registryId="123" />
        </Fill>
      )}
    />
  );
};
