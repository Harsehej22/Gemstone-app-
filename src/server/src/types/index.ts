import { Request } from 'express';
import { Types } from 'mongoose';

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type Gender = 'male' | 'female' | 'other';

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export interface GemstoneData {
  name: string;
  planet: string;
  benefits: string[];
  wearingMethod: string;
  recommendedMetal: string;
  recommendedFinger: string;
  recommendedDay: string;
  zodiacSigns: ZodiacSign[];
}

export interface RecommendationResult {
  zodiacSign: ZodiacSign;
  gemstone: GemstoneData;
  confidenceScore: number;
  reportSummary: string;
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  dateOfBirth?: Date;
  timeOfBirth?: string;
  placeOfBirth?: string;
  gender?: Gender;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGemstone {
  _id: Types.ObjectId;
  name: string;
  planet: string;
  benefits: string[];
  wearingMethod: string;
  recommendedMetal: string;
  recommendedFinger: string;
  recommendedDay: string;
  zodiacSigns: ZodiacSign[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRecommendation {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  zodiacSign: ZodiacSign;
  gemstoneId: Types.ObjectId;
  gemstoneName: string;
  confidenceScore: number;
  reportSummary: string;
  birthDetails: {
    dateOfBirth: Date;
    timeOfBirth: string;
    placeOfBirth: string;
    gender: Gender;
  };
  createdAt: Date;
  updatedAt: Date;
}
