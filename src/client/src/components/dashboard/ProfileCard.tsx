import { User } from '../../types';
import { Card } from '../ui/Card';
import { User as UserIcon, Calendar, Clock, MapPin } from 'lucide-react';

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const hasProfile = user.dateOfBirth && user.timeOfBirth && user.placeOfBirth;

  return (
    <Card title="Your Profile" subtitle="Birth details for gemstone recommendations">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3">
          <UserIcon className="h-6 w-6 text-primary-600" />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>

          {hasProfile ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4 text-primary-500" />
                {new Date(user.dateOfBirth!).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4 text-primary-500" />
                {user.timeOfBirth}
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 sm:col-span-2">
                <MapPin className="h-4 w-4 text-primary-500" />
                {user.placeOfBirth}
              </div>
              {user.gender && (
                <div className="text-gray-600 dark:text-gray-300 capitalize">
                  Gender: {user.gender}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Complete your profile to get personalized gemstone recommendations.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
