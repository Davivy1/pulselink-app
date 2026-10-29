import { create } from 'zustand';

// 1. Export the AlertData Interface
export interface AlertData {
  alertId?: string;
  hospitalId: string;
  hospitalName: string;
  bloodType: string;
  units: number;
  urgency: 'CRITICAL' | 'HIGH' | 'NORMAL';
  radiusKm: number;
  status: 'DISPATCHED' | 'ACCEPTED' | 'EN_ROUTE' | 'FULFILLED';
  acceptedDonorId?: string;
  acceptedDonorName?: string;
  checkInToken?: string;
  createdAt?: string;
}

// 2. Define the Store State Interface
interface EmergencyStore {
  activeAlert: AlertData | null;
  dispatchAlert: (alertData: Omit<AlertData, 'status'>) => void;
  acceptAlert: (donorId: string, donorName: string) => void;
  verifyQrCode: (token: string) => boolean;
  resetStore: () => void;
}

// 3. Initial State
const initialAlertState: AlertData = {
  alertId: 'PL-ALERT-101',
  hospitalId: 'H101',
  hospitalName: 'Federal Medical Centre Owerri',
  bloodType: 'O-',
  units: 2,
  urgency: 'CRITICAL',
  radiusKm: 5,
  status: 'DISPATCHED',
  checkInToken: 'PL-8890',
  createdAt: new Date().toISOString(),
};

// 4. Create the Zustand Store
// Set activeAlert to null by default so the donor page opens on the idle dashboard
export const useEmergencyStore = create<EmergencyStore>((set, get) => ({
  activeAlert: null, // <--- CHANGE THIS FROM initialAlertState TO null

  dispatchAlert: (data) => {
    set({
      activeAlert: {
        ...data,
        alertId: `PL-ALERT-${Math.floor(100 + Math.random() * 900)}`,
        status: 'DISPATCHED',
        checkInToken: 'PL-8890',
        createdAt: new Date().toISOString(),
      },
    });
  },

  acceptAlert: (donorId: string, donorName: string) => {
    const current = get().activeAlert;
    if (!current) return;

    set({
      activeAlert: {
        ...current,
        status: 'ACCEPTED',
        acceptedDonorId: donorId,
        acceptedDonorName: donorName,
      },
    });
  },

  verifyQrCode: (token: string) => {
  const current = get().activeAlert;
  if (current) {
    set({
      activeAlert: {
        ...current,
        status: 'FULFILLED', // <--- Updates global store status
      },
    });
    return true;
  }
  return false;
},

  // Added resetStore implementation to fix the TypeScript error
  resetStore: () => {
    set({ activeAlert: null });
  },
}));