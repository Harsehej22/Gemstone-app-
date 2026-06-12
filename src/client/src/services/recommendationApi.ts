import { api } from './api';
import { ApiResponse, Recommendation, Pagination, Analytics, Gender } from '../types';

export async function createRecommendation(birthDetails: {
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: Gender;
}) {
  const { data } = await api.post<ApiResponse<{ recommendation: Recommendation }>>(
    '/recommendations',
    birthDetails
  );
  return data.data.recommendation;
}

export async function getRecommendations(params?: { q?: string; page?: number; limit?: number }) {
  const { data } = await api.get<
    ApiResponse<{ recommendations: Recommendation[]; pagination: Pagination }>
  >('/recommendations', { params });
  return data.data;
}

export async function getRecommendationById(id: string) {
  const { data } = await api.get<ApiResponse<{ recommendation: Recommendation }>>(
    `/recommendations/${id}`
  );
  return data.data.recommendation;
}

export async function getAllRecommendationsAdmin(page = 1, limit = 20) {
  const { data } = await api.get<
    ApiResponse<{ recommendations: Recommendation[]; pagination: Pagination }>
  >('/recommendations/admin/all', { params: { page, limit } });
  return data.data;
}

export async function getAnalytics() {
  const { data } = await api.get<ApiResponse<{ analytics: Analytics }>>(
    '/recommendations/admin/analytics'
  );
  return data.data.analytics;
}

export function getExportPdfUrl(id: string) {
  const token = localStorage.getItem('token');
  const base = import.meta.env.VITE_API_URL || '/api';
  return `${base}/recommendations/${id}/export/pdf?token=${token}`;
}

export async function downloadPdf(id: string) {
  const response = await api.get(`/recommendations/${id}/export/pdf`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `recommendation-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export async function downloadJson(id: string) {
  const response = await api.get(`/recommendations/${id}/export/json`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `recommendation-${id}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
