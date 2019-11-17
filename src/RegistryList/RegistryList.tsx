import React from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { NonIdealState } from '@blueprintjs/core';
import { Tag } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { ListItem } from '../ListItem/ListItem';
import { useRegistries } from '../data/registriesStore';
import { useUserStore } from '../data/userStore';

export const RegistryList: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const { error, loading, data } = useRegistries();
  const [user] = useUserStore();
  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <p>Ошибка запроса</p>;
  }
  if (!data.length) {
    return (
      <NonIdealState
        icon="document"
        description="Нет созданных реестров"
      ></NonIdealState>
    );
  }
  return (
    <div style={{ display: 'grid' }}>
      {data.map((registry) =>
        registry.status === 'NEW' && user.role === 'CLIENT' ? null : (
          <ListItem
            key={registry.contractId}
            onClick={() => history.push(`/registries/${registry.contractId}`)}
          >
            <div>
              <div>{registry.company.name}</div>
              <small style={{ color: 'var(--gray3)' }}>
                {registry.fromDate}–{registry.toDate}
              </small>{' '}
              {registry.status === 'NEW' && user.role === 'CLIENT' && (
                <Tag>ожидает согласования</Tag>
              )}
              {registry.status === 'NEW' && user.role === 'CONTRACTOR' && (
                <Tag intent="primary">Новый</Tag>
              )}
              {registry.status === 'ACCEPTING' &&
                user.role === 'CONTRACTOR' && <Tag>ожидает согласования</Tag>}
              {registry.status === 'ACCEPTING' && user.role === 'CLIENT' && (
                <Tag intent="primary">на согласовании</Tag>
              )}
              {registry.status === 'ACCEPTED' && user.role === 'CLIENT' && (
                <Tag>ожидает подписания</Tag>
              )}
              {registry.status === 'ACCEPTED' && user.role === 'CONTRACTOR' && (
                <Tag intent="primary">ожидает подписания</Tag>
              )}
              {registry.status === 'APPROVED' && user.role === 'CLIENT' && (
                <Tag intent="success">подписан</Tag>
              )}
            </div>
            <AnchorButton minimal icon="chevron-right" />
          </ListItem>
        ),
      )}
    </div>
  );
};
