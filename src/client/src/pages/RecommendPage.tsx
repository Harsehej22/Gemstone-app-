import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { createRecommendation } from '../services/recommendationApi';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Gender } from '../types';
import { Sparkles } from 'lucide-react';

export function RecommendPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    timeOfBirth: user?.timeOfBirth || '',
    placeOfBirth: user?.placeOfBirth || '',
    gender: (user?.gender || 'male') as Gender,
  });
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: createRecommendation,
    onSuccess: (recommendation) => {
      navigate(`/recommendations/${recommendation._id}`);
    },
    onError: (err: unknown) => {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(message || 'Failed to generate recommendation');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Sparkles className="h-10 w-10 text-primary-600 mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          Get Your Gemstone Recommendation
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Enter your birth details for a personalized astrology-based recommendation
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <Input
            label="Date of Birth"
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
            required
          />

          <Input
            label="Time of Birth"
            type="time"
            value={form.timeOfBirth}
            onChange={(e) => setForm({ ...form, timeOfBirth: e.target.value })}
            required
          />

          <Input
            label="Place of Birth"
            value={form.placeOfBirth}
            onChange={(e) => setForm({ ...form, placeOfBirth: e.target.value })}
            placeholder="City, Country"
            required
          />

          <Select
            label="Gender"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />

          <Button type="submit" className="w-full" isLoading={mutation.isPending}>
            <Sparkles className="h-4 w-4" />
            Generate Recommendation
          </Button>
        </form>
      </Card>
    </div>
  );
}
