import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { getRecommendations } from '../services/recommendationApi';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { HistoryList } from '../components/dashboard/HistoryList';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { Sparkles } from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['recommendations', searchQuery],
    queryFn: () => getRecommendations({ q: searchQuery || undefined, limit: 10 }),
  });

  const latestRecommendation = data?.recommendations[0];

  if (!user) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Your personalized gemstone consultation dashboard
          </p>
        </div>
        <Link to="/recommend">
          <Button>
            <Sparkles className="h-4 w-4" />
            New Recommendation
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileCard user={user} />
        <div className="rounded-xl border border-dashed border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20 p-6 flex flex-col items-center justify-center text-center">
          <Sparkles className="h-10 w-10 text-primary-600 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Ready for a new reading?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Enter your birth details to discover your ideal gemstone.
          </p>
          <Link to="/profile">
            <Button variant="secondary" size="sm" className="mr-2">Update Profile</Button>
          </Link>
          <Link to="/recommend">
            <Button size="sm">Get Recommendation</Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner message="Loading recommendations..." />
      ) : latestRecommendation ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Latest Recommendation
          </h2>
          <RecommendationCard recommendation={latestRecommendation} />
        </div>
      ) : null}

      <HistoryList
        recommendations={data?.recommendations || []}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        isLoading={isLoading}
      />
    </div>
  );
}
