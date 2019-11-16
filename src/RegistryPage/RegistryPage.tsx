import React from 'react';
import { Fill } from '@wordpress/components';
import { Route } from 'react-router-dom';
import { Registry } from './Registry/Registry';

export const RegistryPage: React.FunctionComponent = () => {

  return (
    <Route
      exact
      path="/registries/:id"
      render={({ match }) => {
        return (
          <Fill name="layoutBody">
            <Registry contractId ={match.params.id} />
          </Fill>
        );
      }}
    />
  );
};
