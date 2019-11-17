import { Registry as IRegistry } from '../types';

const hiddenShipmentKeys = new Set([
  'services',
  'dateStart',
  'dateEnd',
  'dateStartPlan',
  'dateEndPlan',
  'dateStartFact',
  'dateEndPlanFact',
]);
export function mapOverShipmentFields(registry: IRegistry) {
  const fields = [];
  if (!registry.shipments.length) {
    return fields;
  }
  const shipment = registry.shipments[0];
  Object.keys(shipment).forEach((key) => {
    if (hiddenShipmentKeys.has(key)) {
      return;
    }
    fields.push(key);
  });
  return fields;
}

const hiddenServiceKeys = new Set([
  'service',
  'status',
  'changeReason',
  'changeAuthor',
  'changeTxId',
  'lastUpdateDate',
]);

export function mapOverServiceFields(registry: IRegistry) {
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
    if (hiddenServiceKeys.has(key)) {
      return;
    }
    fields.push(key);
  });
  return fields;
}

type Status = 'NEW' | 'ACCEPTING' | 'ACCEPTED' | 'APPROVED';
export function describeRegistryStatus(status: Status, user) {
  const roles = {
    CLIENT: {
      NEW: {
        actionRequired: false,
        description: 'Ожидает отправки',
        intent: 'default',
      },
      ACCEPTING: {
        actionRequired: true,
        description: 'На согласовании',
        intent: 'primary',
      },
      ACCEPTED: {
        actionRequired: false,
        description: 'Принять',
        intent: 'default',
      },
      APPROVED: {
        actionRequired: false,
        description: 'Подписан',
        intent: 'success',
      },
    },
    CONTRACTOR: {
      NEW: {
        actionRequired: true,
        description: 'Новый',
        intent: 'primary',
      },
      ACCEPTING: {
        actionRequired: false,
        description: 'На согласовании',
        intent: 'default',
      },
      ACCEPTED: {
        actionRequired: true,
        description: 'Принят клиентом',
        intent: 'primary',
      },
      APPROVED: {
        actionRequired: false,
        description: 'Подписан',
        intent: 'success',
      },
    },
  };

  return roles[user.role][status];
}

type ServiceStatus = 'ACCEPTING_CLIENT' | 'ACCEPTING_OWNER' | 'ACCEPTED';
export function describeServiceStatus(status: ServiceStatus, user) {
  const roles = {
    CLIENT: {
      ACCEPTING_CLIENT: {
        actionRequired: true,
        description: 'На согласовании',
        intent: 'primary',
      },
      ACCEPTING_OWNER: {
        actionRequired: false,
        description: 'На согласовании',
        intent: 'default',
      },
      ACCEPTED: {
        actionRequired: false,
        description: 'Принят',
        intent: 'default',
      },
    },
    CONTRACTOR: {
      ACCEPTING_CLIENT: {
        actionRequired: false,
        description: 'На согласовании',
        intent: 'default',
      },
      ACCEPTING_OWNER: {
        actionRequired: true,
        description: 'На согласовании',
        intent: 'primary',
      },
      ACCEPTED: {
        actionRequired: false,
        description: 'Принят',
        intent: 'default',
      },
    },
  };
  return roles[user.role][status];
}
