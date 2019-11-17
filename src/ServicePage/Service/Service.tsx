import React, { useState, useCallback, useEffect } from 'react';
import ky from 'ky';
import { useMedia } from 'the-platform';
import {
  Service as IService,
  Shipment as IShipment,
  Registry as IRegistry,
  ServerResponse,
} from '../../types';
import { HTMLTable, Button } from '@blueprintjs/core';
import { Popover, Position, Card } from '@blueprintjs/core';
import { Tag } from '@blueprintjs/core';
import { Callout } from '@blueprintjs/core';
import { ControlGroup, InputGroup } from '@blueprintjs/core';
import { EditableText } from '@blueprintjs/core';
import { refetchRegistries } from '../../data/registriesStore';
import {
  mapOverServiceFields,
  mapOverShipmentFields,
  getDisplayField,
  getServiceFieldsInUserOrder,
} from '../../data/registry';
import { useUserStore } from '../../data/userStore';
import { useCompanySettings } from '../../data/companySettingsStore';
import { useTransactionStore } from '../../data/transactionStore';
import { post } from '../../data/post';
import { useRequest } from '../../data/useRequest';

interface Props {
  registry: IRegistry;
  shipment: IShipment;
  service: IService;
}

export const Service: React.FunctionComponent<Props> = ({
  registry,
  shipment,
  service,
}) => {
  const isLarge = useMedia('(min-width: 600px)');
  const [user] = useUserStore();
  const [companySettings] = useCompanySettings();
  const [transactions, updateTransactions] = useTransactionStore();
  const [sending, setSending] = useState(false);
  const shipmentFieldNames = mapOverShipmentFields(registry);
  const fieldNames = getServiceFieldsInUserOrder(
    mapOverServiceFields(registry),
    registry,
    companySettings,
  );
  const [values, setValues] = useState({ ...service });
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setValues({ ...service });
  }, [service]);

  const request = useCallback(() => {
    return ky(`${process.env.BASE_URL}/api/registry/${registry.contractId}/${service.id}/history`)
      .json()
      .then((response: ServerResponse) => response.result);
  }, [registry.contractId, service.id]);

  const { loading, error, data: history } = useRequest({ request });

  const someChanges = fieldNames.some(
    (f) => String(values[f]) !== String(service[f]),
  );
  const hasChangesThatRequireComments = fieldNames.some(
    (f) => String(values[f]) !== String(service[f]) && f === 'price',
  );

  return (
    <div>
      <br />
      <div
        style={
          isLarge
            ? { display: 'flex', justifyContent: 'flex-end' }
            : { display: 'grid', gridGap: 5 }
        }
      >
        {(service.status === 'ACCEPTING_CLIENT' && user.role === 'CLIENT') ||
        (service.status === 'ACCEPTING_OWNER' && user.role === 'CONTRACTOR') ? (
          <>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const changeReason = (event.currentTarget.elements as any)
                  .changeReason.value;
                setSending(true);
                post(
                  `${process.env.BASE_URL}/api/registry/${registry.contractId}/${service.id}/update`,
                  {
                    json: {
                      ...service,
                      ...values,
                      changeReason,
                      changeAuthor: user.username,
                    },
                  },
                ).then(
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
              <ControlGroup vertical={false} style={{ marginRight: '0.5em' }}>
                <InputGroup
                  name="changeReason"
                  placeholder="комментарий к изменениям"
                  disabled={!someChanges || sending}
                  required={hasChangesThatRequireComments}
                />
                <Button
                  type="submit"
                  disabled={!someChanges || sending}
                  loading={sending}
                >
                  Обновить
                </Button>
              </ControlGroup>
            </form>
            <Button
              disabled={someChanges || sending}
              loading={sending}
              intent="success"
              onClick={() => {
                setSending(true);
                post(
                  `${process.env.BASE_URL}/api/registry/${registry.contractId}/${service.id}/approve`,
                ).then(
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
          </>
        ) : null}
        {(service.status === 'ACCEPTING_CLIENT' &&
          user.role === 'CONTRACTOR') ||
        (service.status === 'ACCEPTING_OWNER' && user.role === 'CLIENT') ? (
          <Tag>Ожидает согласования</Tag>
        ) : null}
      </div>
      <br />
      {service.changeReason ? (
        <Callout icon="chat" intent="warning">
          {service.changeReason}
        </Callout>
      ) : null}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <HTMLTable bordered style={{ width: '100%' }}>
          <tbody>
            {shipmentFieldNames.map((fieldName) => (
              <tr key={fieldName}>
                <td style={{ backgroundColor: 'var(--light-gray5)' }}>
                  <strong>{fieldName}</strong>
                </td>
                <td style={{ backgroundColor: 'var(--light-gray5)' }}>
                  {shipment[fieldName]}
                </td>
              </tr>
            ))}
            {fieldNames.map((fieldName) => (
              <tr key={fieldName}>
                <td>
                  <Popover
                    content={<span style={{ padding: 5 }}>{fieldName}</span>}
                    interactionKind="hover"
                    minimal
                    position={Position.TOP}
                  >
                    <strong>
                      {getDisplayField(fieldName, registry, companySettings)}
                    </strong>
                  </Popover>
                </td>
                <td>
                  <EditableText
                    selectAllOnFocus
                    intent={
                      String(values[fieldName]) !== String(service[fieldName])
                        ? 'success'
                        : undefined
                    }
                    value={values[fieldName]}
                    onChange={(value) => {
                      setValues({ ...values, [fieldName]: value });
                    }}
                    onEdit={() => setEditing({ ...editing, [fieldName]: true })}
                    onCancel={() =>
                      setEditing({ ...editing, [fieldName]: false })
                    }
                    onConfirm={() =>
                      setEditing({ ...editing, [fieldName]: false })
                    }
                  />
                  {history != null
                    ? history
                        .slice()
                        .reverse()
                        .filter(
                          (prev) =>
                            String(prev[fieldName]) !==
                            String(service[fieldName]),
                        )
                        .map((prev, index) => (
                          <>
                            {index === 0 ? '← ' : ' '}
                            <Popover
                              position={Position.TOP}
                              interactionKind="hover"
                              content={
                                <Card>
                                  <div>
                                    Дата изменения: {prev.lastUpdateDate}
                                  </div>
                                  <div>
                                    Транзакция:{' '}
                                    <a
                                      href={`http://52.174.38.33/explorer/transactions/id/${prev.changeTxId}`}
                                      target="_blank"
                                    >
                                      {prev.changeTxId}
                                    </a>
                                  </div>
                                  {prev.changeAuthor ? (
                                    <div>Изменил: {prev.changeAuthor}</div>
                                  ) : null}
                                </Card>
                              }
                            >
                              <Tag minimal>
                                <del>{prev[fieldName]}</del>
                              </Tag>
                            </Popover>
                          </>
                        ))
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      </div>
    </div>
  );
};
