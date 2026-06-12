import { Recommendation } from '../models/Recommendation.js';
import { Gemstone } from '../models/Gemstone.js';
import { getZodiacSign } from '../utils/zodiac.js';
import { ZODIAC_GEMSTONE_MAP } from '../utils/gemstoneData.js';
import { AppError } from '../utils/errors.js';
import { Gender } from '../types/index.js';

interface BirthDetails {
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: Gender;
}

/**
 * Calculates confidence score based on profile completeness and zodiac-gemstone alignment.
 */
function calculateConfidenceScore(
  hasCompleteProfile: boolean,
  gemstoneMatchesZodiac: boolean
): number {
  let score = 70; // Base score for zodiac-based rule engine
  if (gemstoneMatchesZodiac) score += 20;
  if (hasCompleteProfile) score += 10;
  return Math.min(score, 100);
}

function generateReportSummary(
  zodiacSign: string,
  gemstoneName: string,
  planet: string,
  placeOfBirth: string
): string {
  return `Based on your birth details from ${placeOfBirth}, your zodiac sign is ${zodiacSign}. ` +
    `We recommend ${gemstoneName}, associated with ${planet}, to harmonize planetary energies ` +
    `and support your personal growth, well-being, and prosperity.`;
}

export async function createRecommendation(userId: string, birthDetails: BirthDetails) {
  const dateOfBirth = new Date(birthDetails.dateOfBirth);
  const zodiacSign = getZodiacSign(dateOfBirth);
  const gemstoneName = ZODIAC_GEMSTONE_MAP[zodiacSign];

  const gemstone = await Gemstone.findOne({ name: gemstoneName });
  if (!gemstone) {
    throw new AppError(`Gemstone data not found for ${gemstoneName}. Please run seed script.`, 500);
  }

  const gemstoneMatchesZodiac = gemstone.zodiacSigns.includes(zodiacSign);
  const confidenceScore = calculateConfidenceScore(true, gemstoneMatchesZodiac);
  const reportSummary = generateReportSummary(
    zodiacSign,
    gemstone.name,
    gemstone.planet,
    birthDetails.placeOfBirth
  );

  const recommendation = await Recommendation.create({
    userId,
    zodiacSign,
    gemstoneId: gemstone._id,
    gemstoneName: gemstone.name,
    confidenceScore,
    reportSummary,
    birthDetails: {
      dateOfBirth,
      timeOfBirth: birthDetails.timeOfBirth,
      placeOfBirth: birthDetails.placeOfBirth,
      gender: birthDetails.gender,
    },
  });

  const populated = await Recommendation.findById(recommendation._id).populate('gemstoneId');

  return populated;
}

export async function getUserRecommendations(
  userId: string,
  search?: string,
  page: number = 1,
  limit: number = 10
) {
  const query: Record<string, unknown> = { userId };

  if (search) {
    query.$or = [
      { gemstoneName: { $regex: search, $options: 'i' } },
      { zodiacSign: { $regex: search, $options: 'i' } },
      { reportSummary: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const [recommendations, total] = await Promise.all([
    Recommendation.find(query)
      .populate('gemstoneId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Recommendation.countDocuments(query),
  ]);

  return {
    recommendations,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getRecommendationById(id: string, userId: string) {
  const recommendation = await Recommendation.findOne({ _id: id, userId }).populate('gemstoneId');
  if (!recommendation) {
    throw new AppError('Recommendation not found', 404);
  }
  return recommendation;
}

export async function getAllRecommendations(page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;

  const [recommendations, total] = await Promise.all([
    Recommendation.find()
      .populate('userId', 'name email')
      .populate('gemstoneId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Recommendation.countDocuments(),
  ]);

  return {
    recommendations,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getAnalytics() {
  const [
    totalUsers,
    totalRecommendations,
    recommendationsByZodiac,
    recommendationsByGemstone,
    recentRecommendations,
  ] = await Promise.all([
    (await import('../models/User.js')).User.countDocuments(),
    Recommendation.countDocuments(),
    Recommendation.aggregate([
      { $group: { _id: '$zodiacSign', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Recommendation.aggregate([
      { $group: { _id: '$gemstoneName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Recommendation.find()
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  const avgConfidence = await Recommendation.aggregate([
    { $group: { _id: null, avg: { $avg: '$confidenceScore' } } },
  ]);

  return {
    totalUsers,
    totalRecommendations,
    averageConfidenceScore: Math.round(avgConfidence[0]?.avg || 0),
    recommendationsByZodiac,
    recommendationsByGemstone,
    recentRecommendations,
  };
}
