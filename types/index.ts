export type UrgencyLevel = 'CRITICAL' | 'HIGH';
export type DispatchStatus = 'IDLE' | 'DISPATCHED' | 'ACCEPTED' | 'FULFILLED';

export interface AlertData {
  alertId: string;
  hospitalId: string;
  hospitalName: string;
  bloodType: string;
  units: number;
  urgency: UrgencyLevel;
  radiusKm: number;
  status: DispatchStatus;
  createdAt: string;
}

export interface FulfillmentData {
  donorId: string;
  donorName: string;
  donorEta: string;
  qrCode: string;
}

export interface EmergencyStore {
  activeAlert: AlertData | null;
  fulfillment: FulfillmentData | null;
  socketConnected: boolean;
  
  // Actions
  dispatchAlert: (data: Omit<AlertData, 'alertId' | 'status' | 'createdAt'>) => void;
  acceptDispatch: (alertId: string, donorId: string) => void;
  verifyQrCode: (qrCode: string) => boolean;
  resetState: () => void;
}