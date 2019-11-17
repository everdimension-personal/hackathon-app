import React, { useState, useEffect } from 'react';
import {
  Button,
  TextArea
  Classes,
  Dialog,
  H5,
  Intent,
  IDialogProps,
  MenuItem,
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { Registry } from '../types';
import { post } from '../data/post';

interface Props extends IDialogProps {
  onSign: () => void;
  registry: Registry;
}
export const SignDialog: React.FunctionComponent<Props> = ({
  onClose,
  onSign,
  isOpen,
  registry,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [signData, setSignData] = useState(null);
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    post('/api/sign', {
      json: registry,
    }).then((data) => {
      console.log(data.result);
      setSignData(data.result);
    });
  }, [registry, isOpen]);

  return (
    <Dialog
      icon="info-sign"
      isOpen={isOpen}
      onClose={onClose}
      title="Электронная подпись"
    >
      <div className={Classes.DIALOG_BODY}>
        <p>Выберите сертификат, чтобы подписать реестр</p>
        <Select
          popoverProps={{ minimal: true }}
          filterable={false}
          items={[
            { name: 'Сертификат 1', date: '19.02.2016' },
            { name: 'Сертификат 2', date: '20.05.2018' },
            { name: 'Сертификат 3', date: '13.08.2019' },
          ]}
          onItemSelect={(item) => {
            console.log('item', item);
            setSelectedItem(item);
          }}
          itemRenderer={(item) => (
            <MenuItem
              text={item.name}
              icon="document"
              labelElement={<span>{item.date}</span>}
              onClick={() => setSelectedItem(item)}
            ></MenuItem>
          )}
        >
          <Button icon="document-share">
            {selectedItem ? selectedItem.name : 'Выбор сертификата'}
          </Button>
        </Select>
        {signData ? (
          <TextArea  readOnly style={{
            width: '100%',
            height: 200,
            marginTop: 20
          }}>{signData}</TextArea>
        ) : <p>Генерирование данных для электронной подписи...</p>}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
          <Button intent="primary" onClick={onSign}>
            Подписать
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
