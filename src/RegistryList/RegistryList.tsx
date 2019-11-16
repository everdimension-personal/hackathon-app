import React from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { ListItem } from '../ListItem/ListItem';
import { useRegistries } from '../data/registriesStore';

export const RegistryList: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const { error, loading, data } = useRegistries();
  if (loading) {
    return <span>Loading...</span>
  }
  if (error) {
    return <span>Ошибка запроса</span>
  }
  return (
    <div style={{ display: 'grid' }}>
      {data.map((registry) => (
        <ListItem
          key={registry.contractId}
          onClick={() => history.push(`/registries/${registry.contractId}`)}
        >
          <div>
            <div>{registry.company.name}</div>
            <small style={{ color: 'var(--gray3)' }}>{registry.fromDate}–{registry.toDate}</small>
          </div>
          <AnchorButton minimal icon="chevron-right" />
        </ListItem>
      ))}
    </div>
  );
};
