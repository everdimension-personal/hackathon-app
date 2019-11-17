import React from 'react';
import { H2, H4 } from '@blueprintjs/core';
import { Spinner } from '@blueprintjs/core';
import {
  useRegistries,
  findRegistryByContractId,
} from '../data/registriesStore';
import { CompanySettingsList } from './CompanySettingsList';

interface Props {
  // registry: Registry;
  contractId: string;
}
export const CompanySettings: React.FunctionComponent<Props> = ({
  contractId,
}) => {
  const { error, loading, data } = useRegistries();
  if (loading) {
    return <Spinner></Spinner>;
  }
  const registry = findRegistryByContractId(data, contractId);
  if (error || !registry) {
    return <p>Ошибка запроса</p>;
  }
  // const shipmentFields = mapOverShipmentFields(registry);
  return (
    <div>
      <H2>Компания: &laquo;{registry.company.name}&raquo;</H2>
      <H4>Таблица соответствий</H4>
      <CompanySettingsList registry={registry} />
    </div>
  );
};
