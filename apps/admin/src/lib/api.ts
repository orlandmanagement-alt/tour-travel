export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787/api';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API Request Failed');
  }

  return response.json();
}

/**
 * Admin API Hooks/Methods
 */
export const adminApi = {
  getMetrics: () => apiFetch<any>('/admin/metrics'),
  getMasters: (type: string) => apiFetch<any[]>(`/master/${type}`),
  getTours: () => apiFetch<any[]>('/tours'),
  getTourDetail: (id: string) => apiFetch<any>(`/tours/${id}`),
};
