import React from 'react';
import { Slot } from '@wordpress/components';
import { Navbar } from './Navbar/Navbar';
// import { RegistryList } from '../RegistryList/RegistryList';

export const Layout: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div style={{ padding: 20 }}>
        <Slot name="layoutBody" />
      </div>
    </div>
  );
};
