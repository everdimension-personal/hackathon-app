import React, { useCallback } from 'react';
import { H2 } from '@blueprintjs/core';
import { HTMLTable } from '@blueprintjs/core';
import ky from 'ky';
import { registry } from './sample';
import { useRequest } from '../../data/useRequest';

interface Props {
  registryId: string;
}

export const Registry: React.FunctionComponent<Props> = ({ registryId }) => {
  const baseFields = ['id', 'code', 'name', 'price'];

  const request = useCallback(() => {
    return ky('/api/orgs/octokit/repos').then((d) => {
      console.log('received', d);
    });
  }, []);
  const { error, loading, data } = useRequest({ request });

  if (loading) {
    return <span>loading...</span>;
  }
  if (error) {
    return <p>Ошибка запроса</p>;
  }
  return (
    <div>
      <H2>Реестр</H2>

      <br />

      <HTMLTable interactive={true} style={{ width: '100%' }}>
        <thead>
          <tr>
            {baseFields.map((fieldName) => (
              <th>{fieldName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registry.shipments.map((shipment) => (
            <React.Fragment key={shipment.id}>
              {shipment.services.map((service) => (
                <tr key={service.id}>
                  {baseFields.map((fieldName) => (
                    <td key={fieldName}>{service[fieldName]}</td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
};
