import { create } from 'zustand';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://pulselink-demo1.onrender.com';

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

interface EmergencyStore {
  activeAlert: AlertData | null;
  dispatchAlert: (alertData: Omit<AlertData, 'status'>) => Promise<void>;
  acceptAlert: (donorId: string, donorName: string) => Promise<void>;
  verifyQrCode: (token: string) => Promise<boolean>;
  resetStore: () => void;
}

export const useEmergencyStore = create<EmergencyStore>((set, get) => ({
  activeAlert: null,

  // 1. Dispatch Emergency Alert (POST /api/v1/emergency/dispatch)
  dispatchAlert: async (data) => {
    const payload = {
      hospitalId: data.hospitalId || 'H101',
      hospitalName: data.hospitalName || 'Federal Medical Centre Owerri',
      bloodType: data.bloodType,
      units: data.units,
      urgency: data.urgency,
      radiusKm: data.radiusKm,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/emergency/dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const responseData = await res.json();
        set({
          activeAlert: responseData.data || {
            ...payload,
            alertId: responseData.alertId || `PL-ALERT-${Math.floor(100 + Math.random() * 900)}`,
            status: 'DISPATCHED',
            checkInToken: responseData.checkInToken || 'PL-8890',
            createdAt: new Date().toISOString(),
          },
        });
        return;
      }
    } catch (error) {
      console.warn('Backend reachability warning, using local state fallback:', error);
    }

    // Demo Safety Fallback (PRD Section 8)
    set({
      activeAlert: {
        ...payload,
        alertId: `PL-ALERT-${Math.floor(100 + Math.random() * 900)}`,
        status: 'DISPATCHED',
        checkInToken: 'PL-8890',
        createdAt: new Date().toISOString(),
      },
    });
  },

  // 2. Accept Alert (POST /api/v1/donor/accept)
  acceptAlert: async (donorId: string, donorName: string) => {
    const current = get().activeAlert;
    if (!current) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/donor/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alertId: current.alertId || 'PL-ALERT-101',
          donorId,
        }),
      });

      if (res.ok) {
        const responseData = await res.json();
        set({
          activeAlert: {
            ...current,
            status: 'ACCEPTED',
            acceptedDonorId: donorId,
            acceptedDonorName: donorName,
            checkInToken: responseData.qrCode || current.checkInToken || 'PL-8890',
          },
        });
        return;
      }
    } catch (error) {
      console.warn('Backend reachability warning, using local state fallback:', error);
    }

    // Demo Safety Fallback (PRD Section 8)
    set({
      activeAlert: {
        ...current,
        status: 'ACCEPTED',
        acceptedDonorId: donorId,
        acceptedDonorName: donorName,
      },
    });
  },

  // 3. Verify Check-in QR / Token (POST /api/v1/hospital/verify-qr)
  verifyQrCode: async (token: string) => {
    const current = get().activeAlert;
    if (!current) return false;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/hospital/verify-qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode: token }),
      });

      if (res.ok) {
        set({
          activeAlert: {
            ...current,
            status: 'FULFILLED',
          },
        });
        return true;
      }
    } catch (error) {
      console.warn('Backend verification failed, using local state fallback:', error);
    }

    // Demo Safety Fallback (PRD Section 8)
    if (current.checkInToken === token || token === 'PL-8890') {
      set({
        activeAlert: {
          ...current,
          status: 'FULFILLED',
        },
      });
      return true;
    }
    return false;
  },

  resetStore: () => set({ activeAlert: null }),
}));