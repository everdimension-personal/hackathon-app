import React, { useState } from 'react';
import ky from 'ky';
import { useMedia } from 'the-platform';
import { H2 } from '@blueprintjs/core';
import { NonIdealState } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { HTMLTable } from '@blueprintjs/core';
import { useHistory, Link } from 'react-router-dom';
// import ky from 'ky';
// import { registry } from './sample';
import {
  useRegistries,
  findRegistryByContractId,
} from '../../data/registriesStore';
import {
  mapOverServiceFields,
  mapOverShipmentFields,
} from '../../data/registry';
import { useTransactionStore } from '../../data/transactionStore';
import { ServerResponse } from '../../types';

interface Props {
  contractId: string;
}

export const Registry: React.FunctionComponent<Props> = ({ contractId }) => {
  const isLarge = useMedia('(min-width: 600px)');
  const { error, loading, data: registries } = useRegistries();
  const [transactions, updateTransactions] = useTransactionStore();
  // const baseFields = ['id', 'code', 'name', 'price'];
  const history = useHistory();
  const [sending, setSending] = useState(false);

  // const registry = registries.find((r) => r.contractId === contractId);
  const registry = findRegistryByContractId(registries, contractId);

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
            <Link to={`/company/${registry.contractId}`}>
              Настройки компании
            </Link>
          </div>
          <br />
          <div
            style={
              !isLarge
                ? { display: 'grid', gridGap: 5 }
                : { textAlign: 'right' }
            }
          >
            <Button
              onClick={() => {
                setSending(true);
                ky.post(`/api/registry/${registry.contractId}/send`)
                  .json()
                  .then((response: ServerResponse) => {
                    updateTransactions({
                      ...transactions,
                      transaction: response.result,
                    });
                  });
              }}
              disabled={sending}
            >
              Отправить на согласование
            </Button>{' '}
            <Button
              intent="success"
              disabled={sending}
            >
              Принять
            </Button>
          </div>
          <br />
          <div style={{ overflowX: 'auto', width: '100%' }}>
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
