import { api } from './api';
import { ApiResponse, Gemstone, ZodiacSign } from '../types';

export async function getGemstones() {
  const { data } = await api.get<ApiResponse<{ gemstones: Gemstone[] }>>('/gemstones');
  return data.data.gemstones;
}

export async function updateGemstone(
  id: string,
  updates: Partial<Omit<Gemstone, '_id' | 'zodiacSigns'> & { zodiacSigns?: ZodiacSign[] }>
) {
  const { data } = await api.put<ApiResponse<{ gemstone: Gemstone }>>(`/gemstones/${id}`, updates);
  return data.data.gemstone;
}
