import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BookingStep = 1 | 2 | 3;

interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  serviceId: string;
  address: string;
  preferredDate: string;
  notes: string;
}

interface BookingState {
  step: BookingStep;
  formData: BookingFormData;
  paymentAmount: number;
  isPaid: boolean;
  
  // Actions
  setStep: (step: BookingStep) => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  setPaymentAmount: (amount: number) => void;
  markAsPaid: () => void;
  reset: () => void;
}

const initialFormData: BookingFormData = {
  fullName: "",
  phoneNumber: "",
  serviceId: "",
  address: "",
  preferredDate: "",
  notes: "",
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      step: 1,
      formData: initialFormData,
      paymentAmount: 0,
      isPaid: false,

      setStep: (step) => set({ step }),
      
      updateFormData: (data) => 
        set((state) => ({ 
          formData: { ...state.formData, ...data } 
        })),
        
      setPaymentAmount: (amount) => set({ paymentAmount: amount }),
      
      markAsPaid: () => set({ isPaid: true }),
      
      reset: () => set({ 
        step: 1, 
        formData: initialFormData, 
        paymentAmount: 0, 
        isPaid: false 
      }),
    }),
    {
      name: "premier-care-booking", // LocalStorage key
    }
  )
);
