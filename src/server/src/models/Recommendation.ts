import mongoose, { Schema, Document, Types } from 'mongoose';
import { ZodiacSign, Gender } from '../types/index.js';

export interface IRecommendationDocument extends Document {
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

const recommendationSchema = new Schema<IRecommendationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    zodiacSign: {
      type: String,
      enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
      required: true,
    },
    gemstoneId: { type: Schema.Types.ObjectId, ref: 'Gemstone', required: true },
    gemstoneName: { type: String, required: true },
    confidenceScore: { type: Number, required: true, min: 0, max: 100 },
    reportSummary: { type: String, required: true },
    birthDetails: {
      dateOfBirth: { type: Date, required: true },
      timeOfBirth: { type: String, required: true },
      placeOfBirth: { type: String, required: true },
      gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    },
  },
  { timestamps: true }
);

recommendationSchema.index({ userId: 1, createdAt: -1 });
recommendationSchema.index({ gemstoneName: 'text', reportSummary: 'text' });

export const Recommendation = mongoose.model<IRecommendationDocument>('Recommendation', recommendationSchema);
