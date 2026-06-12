import mongoose, { Schema, Document } from 'mongoose';
import { ZodiacSign } from '../types/index.js';

export interface IGemstoneDocument extends Document {
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

const gemstoneSchema = new Schema<IGemstoneDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    planet: { type: String, required: true },
    benefits: { type: [String], required: true },
    wearingMethod: { type: String, required: true },
    recommendedMetal: { type: String, required: true },
    recommendedFinger: { type: String, required: true },
    recommendedDay: { type: String, required: true },
    zodiacSigns: {
      type: [String],
      enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Gemstone = mongoose.model<IGemstoneDocument>('Gemstone', gemstoneSchema);
