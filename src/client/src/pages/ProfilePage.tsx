import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../services/userApi';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Gender } from '../types';

export function ProfilePage() {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: user?.name || '',
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    timeOfBirth: user?.timeOfBirth || '',
    placeOfBirth: user?.placeOfBirth || '',
    gender: (user?.gender || 'male') as Gender,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setError('');
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      setTimeout(() => setSuccess(''), 3000);
    },
    onError: (err: unknown) => {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(message || 'Failed to update profile');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
        Edit Profile
      </h1>

      <Card title="Birth Details" subtitle="Required for accurate gemstone recommendations">
        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-600 dark:text-green-400">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

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

          <Button type="submit" isLoading={mutation.isPending}>
            Save Profile
          </Button>
        </form>
      </Card>
    </div>
  );
}
