import React, { useState } from 'react';
import { H2 } from '@blueprintjs/core';
import { Spinner } from '@blueprintjs/core';
import { Service } from './Service/Service';
import { ServiceHistory } from './ServiceHistory/ServiceHistory';
import {
  useRegistries,
  findRegistryByContractId,
  findShipmentByServiceId,
  findServiceById,
} from '../data/registriesStore';

interface Props {
  contractId: string;
  serviceId: string;
}

export const ServicePageContent: React.FunctionComponent<Props> = ({
  contractId,
  serviceId,
}) => {
  const { error, loading, data } = useRegistries();
  const [tabId, setTabId] = useState('main');

  if (loading) {
    return <Spinner></Spinner>;
  }

  const registry = findRegistryByContractId(data, contractId);
  if (!registry) {
    return <p>Ошибка запроса</p>;
  }

  const shipment = findShipmentByServiceId(registry, serviceId);
  if (error || !shipment) {
    return <p>Ошибка запроса</p>;
  }

  const service = findServiceById(shipment, serviceId);

  return (
    <>
      {' '}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <H2>Услуга: {service.service.name}</H2>
      </div>
      {tabId === 'main' ? (
        <Service registry={registry} shipment={shipment} service={service} />
      ) : null}
      {tabId === 'history' ? <ServiceHistory service={service} /> : null}
    </>
  );
};

// <Tabs
//   animate
//   id="registryTabs"
//   onChange={(tabId: string) => setTabId(tabId)}
//   selectedTabId={tabId}
// >
//   <Tab id="main" title="Услуга" />
//   <Tab id="history" title="История изменений" />
// </Tabs>
