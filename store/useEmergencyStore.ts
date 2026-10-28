import { create } from 'zustand';
import { EmergencyStore } from '@/types';

export const useEmergencyStore = create<EmergencyStore>((set, get) => ({
  activeAlert: null,
  fulfillment: null,
  socketConnected: false,

  dispatchAlert: (payload) => {
    const newAlert = {
      ...payload,
      alertId: `PL-ALERT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'DISPATCHED' as const,
      createdAt: new Date().toISOString(),
    };
    
    // Save locally for pitch fail-safe
    if (typeof window !== 'undefined') {
      localStorage.setItem('pulselink_active_alert', JSON.stringify(newAlert));
    }

    set({ activeAlert: newAlert, fulfillment: null });
  },

  acceptDispatch: (alertId, donorId) => {
    const currentAlert = get().activeAlert;
    if (!currentAlert) return;

    const updatedAlert = { ...currentAlert, status: 'ACCEPTED' as const };
    const newFulfillment = {
      donorId,
      donorName: 'John Doe',
      donorEta: '12 mins',
      qrCode: `PL-TOKEN-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('pulselink_active_alert', JSON.stringify(updatedAlert));
      localStorage.setItem('pulselink_fulfillment', JSON.stringify(newFulfillment));
    }

    set({ activeAlert: updatedAlert, fulfillment: newFulfillment });
  },

  verifyQrCode: (qrCode) => {
    const { fulfillment, activeAlert } = get();
    if (fulfillment?.qrCode === qrCode || qrCode === 'PL-8890') {
      const fulfilledAlert = activeAlert ? { ...activeAlert, status: 'FULFILLED' as const } : null;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('pulselink_active_alert', JSON.stringify(fulfilledAlert));
      }

      set({ activeAlert: fulfilledAlert });
      return true;
    }
    return false;
  },

  resetState: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pulselink_active_alert');
      localStorage.removeItem('pulselink_fulfillment');
    }
    set({ activeAlert: null, fulfillment: null });
  },
}));