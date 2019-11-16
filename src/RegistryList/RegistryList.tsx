import React from 'react';
import { AnchorButton } from '@blueprintjs/core';
// import { Link } from 'react-router-dom';
import { Fill } from '@wordpress/components';
import { Route, useHistory } from 'react-router-dom';
import { ListItem } from '../ListItem/ListItem';

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

export const RegistryList: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  return (
    <Route exact path="/">
      <Fill name="layoutBody">
        <div style={{ display: 'grid' }}>
          {registries.map((registry) => (
            <ListItem
              key={registry.id}
              onClick={() => history.push(`/registries/${registry.id}`)}
            >
              <div>
                <div>{registry.name}</div>
                <small style={{ color: 'var(--gray3)' }}>
                  {registry.dates}
                </small>
              </div>
              <AnchorButton minimal icon="chevron-right" />
            </ListItem>
          ))}
        </div>
      </Fill>
    </Route>
  );
};
