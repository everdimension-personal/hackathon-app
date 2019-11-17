import React, { useState, useMemo, useEffect } from 'react';
import { Switch } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { Registry } from '../types';
import { ListItem } from '../ListItem/ListItem';
import {
  mapOverServiceFields,
  getServiceFieldsInUserOrder,
} from '../data/registry';
import { SortableList } from './SortableList';
import { useUserStore } from '../data/userStore';
import { useCompanySettings } from '../data/companySettingsStore';

interface Props {
  registry: Registry;
}
export const CompanySettingsList: React.FunctionComponent<Props> = ({
  registry,
}) => {
  // const [user] = useUserStore();
  const [companySettings, setCompanySettings] = useCompanySettings();
  const serviceFields = useMemo(
    () =>
      getServiceFieldsInUserOrder(
        mapOverServiceFields(registry),
        registry,
        companySettings,
      ),
    [registry],
  );
  const [values, setValues] = useState(
    companySettings[registry.company.address] || {},
  );
  const [items, setItems] = useState([...serviceFields]);
  useEffect(() => {
    setCompanySettings({
      ...companySettings,
      [`${registry.company.address}-order`]: items,
    });
  }, [items]);
  return (
    <div>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(fieldName, index) => (
          <ListItem>
            <div
              style={{ display: 'flex', width: '100%', alignItems: 'center' }}
            >
              <Button minimal icon="drag-handle-horizontal" />
              <span style={{ marginRight: '0.5em' }}>
                {index}. {fieldName}:
              </span>
              <InputGroup
                name={fieldName}
                placeholder={fieldName}
                value={values[fieldName]}
                onChange={(event) =>
                  setValues({
                    ...values,
                    [fieldName]: event.currentTarget.value,
                  })
                }
                onBlur={() => {
                  setCompanySettings({
                    ...companySettings,
                    [registry.company.address]: values,
                  });
                }}
              />
              <Switch style={{ marginLeft: 'auto', marginBottom: 0 }} />
            </div>
          </ListItem>
        )}
      />
    </div>
  );
};
