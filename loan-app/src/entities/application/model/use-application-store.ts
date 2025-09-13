import { create } from 'zustand';
import type { LoanApplication } from '@/shared/types';

interface ApplicationStore {
  applications: LoanApplication[];
  addApplication: (application: Omit<LoanApplication, 'id' | 'createdAt'>) => void;
  removeApplication: (id: string) => void;
  getApplications: () => LoanApplication[];
}

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
  applications: [],

  addApplication: (application) =>
    set((state) => ({
      applications: [
        ...state.applications,
        {
          ...application,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        },
      ],
    })),

  removeApplication: (id) =>
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== id),
    })),

  getApplications: () => get().applications,
}));
