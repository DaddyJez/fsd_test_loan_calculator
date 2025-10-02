// Имитация задержки сети
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Базовый клиент для имитации HTTP-запросов
export const apiClient = {
  async get<T>(url: string, data?: unknown): Promise<T> {
    await delay(500 + Math.random() * 500);
    console.log(`GET ${url}`, data);

    if (url === '/applications') {
      return localStorage.getItem('loanApplications')
        ? JSON.parse(localStorage.getItem('loanApplications')!)
        : ([] as T);
    }

    throw new Error(`Unknown endpoint: ${url}`);
  },

  async post<T>(url: string, data: unknown): Promise<T> {
    await delay(800 + Math.random() * 700);
    console.log(`POST ${url}`, data);

    if (url === '/applications') {
      const newApplication = {
        ...(data as Record<string, unknown>),
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };

      const existingApplications = localStorage.getItem('loanApplications')
        ? JSON.parse(localStorage.getItem('loanApplications')!)
        : [];

      const updatedApplications = [...existingApplications, newApplication];
      localStorage.setItem('loanApplications', JSON.stringify(updatedApplications));

      return newApplication as T;
    }

    throw new Error(`Unknown endpoint: ${url}`);
  },

  async delete(url: string, id: string): Promise<void> {
    await delay(300 + Math.random() * 300);
    console.log(`DELETE ${url}`, id);

    if (url === '/applications') {
      const existingApplications = localStorage.getItem('loanApplications')
        ? JSON.parse(localStorage.getItem('loanApplications')!)
        : [];

      const updatedApplications = existingApplications.filter(
        (app: { id: string }) => app.id !== id
      );
      localStorage.setItem('loanApplications', JSON.stringify(updatedApplications));

      return;
    }

    throw new Error(`Unknown endpoint: ${url}`);
  },
};
