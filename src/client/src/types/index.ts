export type Gender = 'male' | 'female' | 'other';
export type UserRole = 'user' | 'admin';

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  dateOfBirth?: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
  gender?: Gender;
  createdAt: string;
  updatedAt: string;
}

export interface Gemstone {
  _id: string;
  name: string;
  planet: string;
  benefits: string[];
  wearingMethod: string;
  recommendedMetal: string;
  recommendedFinger: string;
  recommendedDay: string;
  zodiacSigns: ZodiacSign[];
}

export interface BirthDetails {
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: Gender;
}

export interface Recommendation {
  _id: string;
  userId: string;
  zodiacSign: ZodiacSign;
  gemstoneId: Gemstone;
  gemstoneName: string;
  confidenceScore: number;
  reportSummary: string;
  birthDetails: BirthDetails;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: { field: string; message: string }[];
}

export interface Analytics {
  totalUsers: number;
  totalRecommendations: number;
  averageConfidenceScore: number;
  recommendationsByZodiac: { _id: string; count: number }[];
  recommendationsByGemstone: { _id: string; count: number }[];
  recentRecommendations: Recommendation[];
}
