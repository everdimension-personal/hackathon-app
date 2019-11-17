import { Registry as IRegistry } from '../types';

export function mapOverShipmentFields(registry: IRegistry) {
  const fields = [];
  if (!registry.shipments.length) {
    return fields;
  }
  const shipment = registry.shipments[0];
  Object.keys(shipment).forEach((key) => {
    if (key === 'services') {
      return;
    }
    fields.push(key);
  });
  return fields;
}

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
    if (key === 'service') {
      return;
    }
    fields.push(key);
  });
  return fields;
}
