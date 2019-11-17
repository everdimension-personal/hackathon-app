import { useEffect, useState } from 'react';
import { createStore } from 'hooksy';
import ky from 'ky';
import { Registry, Shipment } from '../types';
import { registriesSample } from './registriesSample';
// import { useRequest } from './useRequest';

// interface RegistriesData {
//   data: Registry[];
// }

interface Response {
  content: Registry[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  totalElements: number;
  totalPages: number;
}

interface ArrayContent {
  first: boolean;
  last: boolean;
  results: Registry[];
}

export const [useRegistriesStore, updateRegistries] = createStore<ArrayContent>(
  {
    first: null,
    last: null,
    results: null,
  },
);

export function useRegistries() {
  const [registries, setRegistries] = useRegistriesStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (registries.results != null) {
      return;
    }
    setLoading(true);
    setError(false);
    ky.get('/api/registry')
      .json()
      .then(
        (data) => {
          console.log('data', data);
          setRegistries({
            first: data.result.first,
            last: data.result.last,
            results: [...(registries.results || []), ...data.result.content],
          });
          setLoading(false);
        },
        () => {
          setLoading(false);
          setError(true);
        },
      );
  }, [registries.results, setRegistries]);

  // function getById(id: string) {
  //   return registries.data ? registries.data.find((r) => r.id === id) : null;
  // }

  // const registries = [];

  return {
    loading,
    error,
    data: registries.results || [],
  };
}

export function findRegistryByContractId(registries: Registry[], id: string) {
  return registries.find((r) => r.contractId === id);
}

export function findShipmentByServiceId(registry: Registry, id: string) {
  return registry.shipments.find((shipment) =>
    shipment.services.some((service) => service.id === id),
  );
}

export function findServiceById(shipment: Shipment, id: string) {
  return shipment.services.find((service) => service.id === id);
}
