import { Link } from 'react-router-dom';
import { Recommendation } from '../../types';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import { Gem, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface HistoryListProps {
  recommendations: Recommendation[];
  onSearch: (query: string) => void;
  searchQuery: string;
  isLoading?: boolean;
}

export function HistoryList({ recommendations, onSearch, searchQuery, isLoading }: HistoryListProps) {
  return (
    <Card title="Recommendation History" subtitle="Search and view past recommendations">
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by gemstone, zodiac sign..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-gray-500">Loading history...</div>
      ) : recommendations.length === 0 ? (
        <EmptyState
          title="No recommendations yet"
          description="Generate your first gemstone recommendation to see it here."
          action={
            <Link to="/recommend">
              <Button>Get Recommendation</Button>
            </Link>
          }
        />
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recommendations.map((rec) => (
            <Link
              key={rec._id}
              to={`/recommendations/${rec._id}`}
              className="flex items-center justify-between py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 -mx-2 px-2 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary-100 dark:bg-primary-900/30 p-2">
                  <Gem className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors">
                    {rec.gemstoneName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {rec.zodiacSign} • {new Date(rec.createdAt).toLocaleDateString()} • {rec.confidenceScore}% match
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
