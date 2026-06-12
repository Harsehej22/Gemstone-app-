import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const profileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    timeOfBirth: z.string().min(1, 'Time of birth is required'),
    placeOfBirth: z.string().min(2, 'Place of birth is required'),
    gender: z.enum(['male', 'female', 'other']),
  }),
});

export const recommendationSchema = z.object({
  body: z.object({
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    timeOfBirth: z.string().min(1, 'Time of birth is required'),
    placeOfBirth: z.string().min(2, 'Place of birth is required'),
    gender: z.enum(['male', 'female', 'other']),
  }),
});

export const gemstoneUpdateSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    planet: z.string().min(1).optional(),
    benefits: z.array(z.string()).optional(),
    wearingMethod: z.string().optional(),
    recommendedMetal: z.string().optional(),
    recommendedFinger: z.string().optional(),
    recommendedDay: z.string().optional(),
    zodiacSigns: z
      .array(
        z.enum([
          'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
          'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
        ])
      )
      .optional(),
  }),
});

export const searchSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});
