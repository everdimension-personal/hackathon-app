import React, { useState } from 'react';
import { Switch } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { Registry } from '../types';
import { ListItem } from '../ListItem/ListItem';
import { mapOverShipmentFields } from '../data/registry';
import { SortableList } from './SortableList';

interface Props {
  registry: Registry;
}
export const CompanySettingsList: React.FunctionComponent<Props> = ({
  registry,
}) => {
  const shipmentFields = mapOverShipmentFields(registry);
  const [items, setItems] = useState([...shipmentFields]);
  return (
    <div>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(fieldName, index) => (
          <ListItem>
            <div>
              <Button minimal icon="drag-handle-horizontal" />
              {index}. {fieldName}
            </div>
            <Switch></Switch>
          </ListItem>
        )}
      />
    </div>
  );
};
