import React, { useCallback } from 'react';
import { H2 } from '@blueprintjs/core';
import { NonIdealState } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { HTMLTable } from '@blueprintjs/core';
import { useHistory, Link } from 'react-router-dom';
// import ky from 'ky';
// import { registry } from './sample';
import { useRegistries } from '../../data/registriesStore';
import { Registry as IRegistry } from '../../types';

function mapOverShipmentFields(registry: IRegistry) {
  const fields = [];
  if (!registry.shipments.length) {
    return fields;
  }
  const shipment = registry.shipments[0];
  Object.keys(shipment).forEach((key) => {
    if (key === 'services') {
      return;
    }
    fields.push(key);
  });
  console.log('shipment fileds', fields);
  return fields;
}

function mapOverServiceFields(registry: IRegistry) {
  const fields = [];
  if (!registry.shipments.length) {
    return fields;
  }
  const shipment = registry.shipments[0];
  if (!shipment.services.length) {
    return fields;
  }
  const service = shipment.services[0];
  Object.keys(service).forEach((key) => {
    if (key === 'service') {
      return;
    }
    fields.push(key);
  });
  console.log('service fileds', fields);
  return fields;
}

interface Props {
  contractId: string;
}

export const Registry: React.FunctionComponent<Props> = ({ contractId }) => {
  const { error, loading, data: registries } = useRegistries();
  const baseFields = ['id', 'code', 'name', 'price'];
  const history = useHistory();

  const registry = registries.find((r) => r.contractId === contractId);

  // const request = useCallback(() => {
  //   return ky('/api/orgs/octokit/repos').then((d) => {
  //     console.log('received', d);
  //   });
  // }, []);
  // const { error, loading, data } = useRequest({ request });

  if (loading) {
    return <span>loading...</span>;
  }
  if (error || !registry) {
    return <p>Ошибка запроса</p>;
  }
  return (
    <div>
      {registry.shipments.length === 0 ? (
        <NonIdealState
          icon="annotation"
          description="В данном реестре нет отправлений"
        />
      ) : (
        <>
          <H2>Реестр</H2>

          <br />
          <div>
            <div>Компания: {registry.company.name}</div>
            <div>ИНН: {registry.company.inn}</div>
            <div>КПП: {registry.company.kpp}</div>
            <Link to={`/company/${registry.company.address}`}>
              Настройки компании
            </Link>
          </div>
          <br />
          <div style={{ textAlign: 'right' }}>
            <Button intent="success">Принять</Button>
          </div>
          <br />
          <div style={{ overflowY: 'auto', width: '100%' }}>
            <HTMLTable interactive={true} style={{ width: '100%' }}>
              <thead>
                <tr>
                  {mapOverShipmentFields(registry).map((fieldName) => (
                    <th>{fieldName}</th>
                  ))}
                  <th>code</th>
                  <th>name</th>
                  {mapOverServiceFields(registry).map((fieldName) => (
                    <th>{fieldName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registry.shipments.map((shipment) => {
                  const shipmentFields = mapOverShipmentFields(registry);
                  const serviceFields = mapOverServiceFields(registry);
                  return (
                    <React.Fragment key={shipment.id}>
                      {shipment.services.map((service) => {
                        return (
                          <tr
                            key={service.id}
                            onClick={() =>
                              history.push(
                                `/registries/${contractId}/services/${service.id}`,
                              )
                            }
                          >
                            {shipmentFields.map((fieldName) => (
                              <td key={fieldName}>{shipment[fieldName]}</td>
                            ))}
                            <td>{service.service.code}</td>
                            <td>{service.service.name}</td>
                            {serviceFields.map((fieldName) => (
                              <td key={fieldName}>{service[fieldName]}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </HTMLTable>
          </div>
        </>
      )}
    </div>
  );
};
