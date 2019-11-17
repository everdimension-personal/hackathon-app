import React from 'react';
import { H2, H4 } from '@blueprintjs/core';
import { Switch } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { Spinner } from '@blueprintjs/core';
import { Registry } from '../types';
import {
  useRegistries,
  findRegistryByContractId,
} from '../data/registriesStore';
import { mapOverShipmentFields } from '../data/registry';
import { ListItem } from '../ListItem/ListItem';

interface Props {
  // registry: Registry;
  contractId: string;
}
export const CompanySettings: React.FunctionComponent<Props> = ({
  contractId,
}) => {
  const { error, loading, data } = useRegistries();
  const;
  if (loading) {
    return <Spinner></Spinner>;
  }
  const registry = findRegistryByContractId(data, contractId);
  if (error || !registry) {
    return <p>Ошибка запроса</p>;
  }
  const shipmentFields = mapOverShipmentFields(registry);
  return (
    <div>
      <H2>Компания: {registry.company.name}</H2>
      <H4>Таблица соответствий</H4>
      <div>
        {shipmentFields.map((fieldName) => (
          <ListItem>
            <div>
              <Button minimal icon="drag-handle-horizontal" />
              {fieldName}
            </div>
            <Switch></Switch>
          </ListItem>
        ))}
      </div>
    </div>
  );
};
