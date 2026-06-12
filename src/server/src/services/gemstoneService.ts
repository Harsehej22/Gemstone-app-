import { Gemstone } from '../models/Gemstone.js';
import { AppError } from '../utils/errors.js';
import { ZodiacSign } from '../types/index.js';

interface GemstoneUpdateData {
  name?: string;
  planet?: string;
  benefits?: string[];
  wearingMethod?: string;
  recommendedMetal?: string;
  recommendedFinger?: string;
  recommendedDay?: string;
  zodiacSigns?: ZodiacSign[];
}

export async function getAllGemstones() {
  return Gemstone.find().sort({ name: 1 });
}

export async function getGemstoneById(id: string) {
  const gemstone = await Gemstone.findById(id);
  if (!gemstone) {
    throw new AppError('Gemstone not found', 404);
  }
  return gemstone;
}

export async function updateGemstone(id: string, data: GemstoneUpdateData) {
  const gemstone = await Gemstone.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!gemstone) {
    throw new AppError('Gemstone not found', 404);
  }

  return gemstone;
}
