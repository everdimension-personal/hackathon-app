import React, { useState } from 'react';
// import ky from 'ky';
import { useMedia } from 'the-platform';
import { H2 } from '@blueprintjs/core';
import { Tag } from '@blueprintjs/core';
import { NonIdealState } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { HTMLTable } from '@blueprintjs/core';
import { useHistory, Link } from 'react-router-dom';
// import ky from 'ky';
// import { registry } from './sample';
import {
  useRegistries,
  refetchRegistries,
  findRegistryByContractId,
} from '../../data/registriesStore';
import {
  mapOverServiceFields,
  mapOverShipmentFields,
  describeRegistryStatus,
  getDisplayField,
  getServiceFieldsInUserOrder,
} from '../../data/registry';
import { useTransactionStore } from '../../data/transactionStore';
import { useUserStore } from '../../data/userStore';
import { useCompanySettings } from '../../data/companySettingsStore';
import { ServerResponse } from '../../types';
import { post } from '../../data/post';

interface Props {
  contractId: string;
}

export const Registry: React.FunctionComponent<Props> = ({ contractId }) => {
  const isLarge = useMedia('(min-width: 600px)');
  const [companySettings] = useCompanySettings();
  const [user] = useUserStore();
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
  const status = describeRegistryStatus(registry.status, user);
  return (
    <div>
      {registry.shipments.length === 0 ? (
        <NonIdealState
          icon="annotation"
          description="В данном реестре нет отправлений"
        />
      ) : (
        <>
          <H2>Реестр &laquo;{registry.number}&raquo;</H2>

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
            {registry.status === 'NEW' && status.actionRequired && (
              <Button
                onClick={() => {
                  setSending(true);
                  post(`/api/registry/${registry.contractId}/send`).then(
                    (response: ServerResponse) => {
                      setSending(false);
                      updateTransactions({
                        ...transactions,
                        transaction: response.result,
                      });
                      refetchRegistries();
                    },
                    () => {
                      setSending(false);
                    },
                  );
                }}
                disabled={sending}
              >
                Отправить на согласование
              </Button>
            )}
            {registry.status === 'NEW' && user.role === 'CLIENT' && (
              <Tag>Новый</Tag>
            )}
            {registry.status === 'ACCEPTING' && user.role === 'CONTRACTOR' && (
              <Tag>На согласовании</Tag>
            )}
            {registry.status === 'ACCEPTING' && user.role === 'CLIENT' && (
              <Button
                intent="primary"
                disabled={sending}
                onClick={() => {
                  setSending(true);
                  post(`/api/registry/${registry.contractId}/accept`).then(
                    (response: ServerResponse) => {
                      setSending(false);
                      updateTransactions({
                        ...transactions,
                        transaction: response.result,
                      });
                      refetchRegistries();
                    },
                    () => {
                      setSending(false);
                    },
                  );
                }}
              >
                Принять
              </Button>
            )}
            {registry.status === 'ACCEPTED' && user.role === 'CLIENT' && (
              <Tag>Принят</Tag>
            )}
            {registry.status === 'ACCEPTED' && user.role === 'CONTRACTOR' && (
              <Button
                intent="primary"
                disabled={sending}
                onClick={() => {
                  setSending(true);
                  post(`/api/registry/${registry.contractId}/approve`).then(
                    (response: ServerResponse) => {
                      setSending(false);
                      updateTransactions({
                        ...transactions,
                        transaction: response.result,
                      });
                      refetchRegistries();
                    },
                    () => {
                      setSending(false);
                    },
                  );
                }}
              >
                Подписать
              </Button>
            )}
            {registry.status === 'APPROVED' && (
              <Tag intent="success">Подписан</Tag>
            )}
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
                  {getServiceFieldsInUserOrder(
                    mapOverServiceFields(registry),
                    registry,
                    companySettings,
                  ).map((fieldName) => (
                    <th>
                      {getDisplayField(fieldName, registry, companySettings)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registry.shipments.map((shipment) => {
                  const shipmentFields = mapOverShipmentFields(registry);
                  const serviceFields = getServiceFieldsInUserOrder(
                    mapOverServiceFields(registry),
                    registry,
                    companySettings,
                  );
                  return (
                    <React.Fragment key={`shipment-${shipment.id}`}>
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
