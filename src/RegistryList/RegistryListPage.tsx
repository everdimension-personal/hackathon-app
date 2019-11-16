import React from 'react';
// import { Link } from 'react-router-dom';
import { Fill } from '@wordpress/components';
import { Route } from 'react-router-dom';
import { RegistryList } from './RegistryList';

const registries = [
  {
    id: 'Qwe123',
    name: 'ФМ Ложистик Восток Коледино',
    dates: '12/11/2019-31/01/2020',
  },
  {
    id: 'Asd456',
    name: 'Склад ООО "ФудВэй"',
    dates: '12/11/2019-31/01/2020',
  },
  {
    id: '6578hc3b',
    name: 'ООО "БРАВО ПРЕМИУМ"',
    dates: '12/11/2019-31/01/2020',
  },
];

export const RegistryListPage: React.FunctionComponent<{}> = () => {
  return (
    <Route exact path="/">
      <Fill name="layoutBody">
        <RegistryList />
      </Fill>
    </Route>
  );
};
