import { apiClient } from './client';
import type { LoanApplication } from '@/shared/types';

export const applicationApi = {
  // Получить все заявки
  async getApplications(): Promise<LoanApplication[]> {
    try {
      return await apiClient.get<LoanApplication[]>('/applications');
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      return [];
    }
  },

  // Создать новую заявку
  async createApplication(data: LoanApplication): Promise<LoanApplication> {
    try {
      return await apiClient.post<LoanApplication>('/applications', {
        ...data,
        monthlyPayment: data.monthlyPayment || 0,
        totalAmount: data.totalAmount || 0,
      });
    } catch (error) {
      console.error('Failed to create application:', error);
      throw new Error('Не удалось отправить заявку. Попробуйте еще раз.');
    }
  },

  // Удалить заявку
  async deleteApplication(id: string): Promise<void> {
    try {
      await apiClient.delete('/applications', id);
    } catch (error) {
      console.error('Failed to delete application:', error);
      throw new Error('Не удалось удалить заявку. Попробуйте еще раз.');
    }
  },
};
