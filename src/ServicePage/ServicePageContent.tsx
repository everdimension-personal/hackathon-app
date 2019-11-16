import React, { useState } from 'react';
import { Tab, Tabs, H2 } from '@blueprintjs/core';
import { Service } from './Service/Service';
import { ServiceHistory } from './ServiceHistory/ServiceHistory';
import { useRequest } from '../data/useRequest';

const service = {
  id: '5dd00acf0869fc22decc018a',
  code: '5dd00acfd3e30867899d05ef',
  name: 'Lorem',
  price: 5,
};

interface Props {
  serviceId: string;
}

export const ServicePageContent: React.FunctionComponent<Props> = ({
  serviceId,
}) => {
  const [tabId, setTabId] = useState('main');

  return (
    <>
      {' '}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <H2>
          Услуга {service.name} {serviceId}
        </H2>
        <Tabs
          animate
          id="registryTabs"
          onChange={(tabId: string) => setTabId(tabId)}
          selectedTabId={tabId}
        >
          <Tab id="main" title="Услуга" />
          <Tab id="history" title="История изменений" />
        </Tabs>
      </div>
      {tabId === 'main' ? <Service service={service} /> : null}
      {tabId === 'history' ? <ServiceHistory service={service} /> : null}
    </>
  );
};
