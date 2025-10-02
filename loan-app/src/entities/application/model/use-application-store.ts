import { create } from 'zustand';
import type { LoanApplication } from '@/shared/types';
import { applicationApi } from '@/shared/api/application.ts';

interface ApplicationStore {
  applications: LoanApplication[];
  isLoading: boolean;
  error: string | null;
  addApplication: (application: Omit<LoanApplication, 'id' | 'createdAt'>) => void;
  removeApplication: (id: string) => void;
  getApplications: () => LoanApplication[];
  loadApplications: () => Promise<void>;
  clearError: () => void;
}

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
  applications: [],
  isLoading: false,
  error: null,

  loadApplications: async () => {
    set({ isLoading: true, error: null });
    try {
      const applications = await applicationApi.getApplications();
      set({ applications, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Неизвестная ошибка',
        isLoading: false,
      });
    }
  },

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

  removeApplication: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await applicationApi.deleteApplication(id);
      set((state) => ({
        applications: state.applications.filter((app) => app.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Не удалось удалить заявку',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
  getApplications: () => get().applications,
}));
