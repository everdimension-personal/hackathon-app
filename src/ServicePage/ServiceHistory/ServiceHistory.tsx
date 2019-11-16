import React from 'react';
import { NonIdealState } from '@blueprintjs/core';
import { Service as IService } from '../../types';

interface Props {
  service: IService;
}
export const ServiceHistory: React.FunctionComponent<Props> = () => {
  return (
    <NonIdealState
      icon="history"
      description="Здесь будет отображена история изменений"
    />
  );
};
