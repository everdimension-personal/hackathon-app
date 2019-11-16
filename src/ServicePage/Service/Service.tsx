import React, { useState } from 'react';
import { Service as IService } from '../../types';
import { HTMLTable, Button } from '@blueprintjs/core';
import { ControlGroup, InputGroup } from '@blueprintjs/core';
import { EditableText } from '@blueprintjs/core';
// import { ListItem } from '../../ListItem/ListItem';

interface Props {
  service: IService;
}
export const Service: React.FunctionComponent<Props> = ({ service }) => {
  const fieldNames = Object.keys(service);
  const [values, setValues] = useState({ ...service });
  const [editing, setEditing] = useState({});
  const someChanges = fieldNames.some(
    (f) => String(values[f]) !== String(service[f]),
  );
  const hasChangesThatRequireComments = fieldNames.some(
    (f) => String(values[f]) !== String(service[f]) && f === 'price',
  );

  return (
    <div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <ControlGroup vertical={false} style={{ marginRight: '0.5em' }}>
            <InputGroup
              placeholder="комментарий к изменениям"
              disabled={!someChanges}
              required={hasChangesThatRequireComments}
            />
            <Button type="submit" disabled={!someChanges}>
              Обновить
            </Button>
          </ControlGroup>
        </form>
        <Button disabled={someChanges} intent="success">
          Принять
        </Button>
      </div>
      <br />
      <HTMLTable bordered style={{ width: '100%' }}>
        <tbody>
          {fieldNames.map((fieldName) => (
            <tr key={fieldName}>
              <td>
                <strong>{fieldName}</strong>
              </td>
              <td
                style={
                  !editing[fieldName] &&
                  String(values[fieldName]) !== String(service[fieldName])
                    ? {
                        backgroundColor: 'var(--green4)',
                        color: 'white',
                      }
                    : undefined
                }
              >
                <EditableText
                  selectAllOnFocus
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
              </td>
              <td>
                {String(values[fieldName]) !== String(service[fieldName]) ? (
                  <>
                    <del>{service[fieldName]}</del>{' '}
                    <span style={{ color: 'var(--gray3)' }}>
                      (изменено вами)
                    </span>
                    <br />
                  </>
                ) : null}
                <del style={{ color: 'var(--gray3)' }}>
                  {service[fieldName]}
                </del>
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
};
