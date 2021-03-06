export interface ServerResponse {
  code: number;
  message: string;
  result: any;
  success: boolean;
}

export interface Service {
  id: string;
  service: {
    code: string;
    name: string;
  };
  price: number;
  status: 'ACCEPTING_CLIENT' | 'ACCEPTING_OWNER' | 'ACCEPTED';
  changeReason: string | null;
  lastUpdateDate: string;
}

export interface Shipment {
  id: string;
  addressFrom: string;
  addressTo: string;
  services: Service[];
}

export interface Registry {
  contractId: string;
  number: string;
  company: {
    address: string;
    inn: string;
    kpp: string;
    name: string;
  };
  fromDate: string;
  toDate: string;
  regNumber: string;
  createdDate: string;
  shipments: Shipment[];
  status: 'NEW' | 'ACCEPTING' | 'ACCEPTED' | 'APPROVED';
}
