import { Recommendation } from '../../types';
import { Card } from '../ui/Card';
import { Gem, Sparkles } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const gemstoneColors: Record<string, string> = {
  Ruby: 'from-red-500 to-rose-600',
  Emerald: 'from-emerald-500 to-green-600',
  Pearl: 'from-gray-300 to-slate-400',
  Diamond: 'from-blue-200 to-cyan-300',
  Coral: 'from-orange-400 to-red-500',
  'Yellow Sapphire': 'from-yellow-400 to-amber-500',
  'Blue Sapphire': 'from-blue-600 to-indigo-700',
  Amethyst: 'from-purple-500 to-violet-600',
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const gemstone = recommendation.gemstoneId;
  const gradient = gemstoneColors[recommendation.gemstoneName] || 'from-primary-500 to-primary-700';

  return (
    <Card>
      <div className="flex flex-col md:flex-row gap-6">
        <div className={`flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Gem className="h-10 w-10 text-white" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              {recommendation.gemstoneName}
            </h3>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {recommendation.confidenceScore}% match
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300">{recommendation.reportSummary}</p>

          {gemstone && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Detail label="Zodiac Sign" value={recommendation.zodiacSign} />
              <Detail label="Planet" value={gemstone.planet} />
              <Detail label="Metal" value={gemstone.recommendedMetal} />
              <Detail label="Finger" value={gemstone.recommendedFinger} />
              <Detail label="Day" value={gemstone.recommendedDay} />
            </div>
          )}

          {gemstone?.benefits && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Benefits</h4>
              <ul className="space-y-1">
                {gemstone.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {gemstone?.wearingMethod && (
            <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Wearing Method
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{gemstone.wearingMethod}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );
}
