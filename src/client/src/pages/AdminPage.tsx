import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, deleteUser } from '../services/userApi';
import { getAllRecommendationsAdmin, getAnalytics } from '../services/recommendationApi';
import { getGemstones, updateGemstone } from '../services/gemstoneApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Users, Gem, BarChart3, Trash2, Edit2 } from 'lucide-react';
import { Gemstone } from '../types';

type Tab = 'analytics' | 'users' | 'recommendations' | 'gemstones';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [editingGem, setEditingGem] = useState<Gemstone | null>(null);
  const queryClient = useQueryClient();

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: getAnalytics,
    enabled: activeTab === 'analytics',
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
    enabled: activeTab === 'users',
  });

  const { data: recommendationsData, isLoading: recsLoading } = useQuery({
    queryKey: ['admin-recommendations'],
    queryFn: () => getAllRecommendationsAdmin(),
    enabled: activeTab === 'recommendations',
  });

  const { data: gemstones, isLoading: gemsLoading } = useQuery({
    queryKey: ['gemstones'],
    queryFn: getGemstones,
    enabled: activeTab === 'gemstones',
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const updateGemMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Gemstone> }) => updateGemstone(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gemstones'] });
      setEditingGem(null);
    },
  });

  const tabs = [
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
    { id: 'users' as Tab, label: 'Users', icon: Users },
    { id: 'recommendations' as Tab, label: 'Recommendations', icon: Gem },
    { id: 'gemstones' as Tab, label: 'Gemstones', icon: Gem },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Admin Panel</h1>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'analytics' && (
        analyticsLoading ? <LoadingSpinner /> : analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Users" value={analytics.totalUsers} />
            <StatCard label="Total Recommendations" value={analytics.totalRecommendations} />
            <StatCard label="Avg Confidence" value={`${analytics.averageConfidenceScore}%`} />

            <Card title="By Zodiac Sign" className="md:col-span-1">
              <div className="space-y-2">
                {analytics.recommendationsByZodiac.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>{item._id}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="By Gemstone" className="md:col-span-1">
              <div className="space-y-2">
                {analytics.recommendationsByGemstone.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>{item._id}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Recent Activity" className="md:col-span-1">
              <div className="space-y-2">
                {analytics.recentRecommendations.map((rec) => (
                  <div key={rec._id} className="text-sm">
                    <p className="font-medium">{rec.gemstoneName}</p>
                    <p className="text-gray-500">{new Date(rec.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )
      )}

      {activeTab === 'users' && (
        usersLoading ? <LoadingSpinner /> : (
          <Card title="All Users">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Email</th>
                    <th className="text-left py-3 px-2">Role</th>
                    <th className="text-left py-3 px-2">Joined</th>
                    <th className="text-right py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user._id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2">{user.name}</td>
                      <td className="py-3 px-2">{user.email}</td>
                      <td className="py-3 px-2 capitalize">{user.role}</td>
                      <td className="py-3 px-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-2 text-right">
                        {user.role !== 'admin' && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              if (confirm(`Delete user ${user.name}?`)) {
                                deleteUserMutation.mutate(user._id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )
      )}

      {activeTab === 'recommendations' && (
        recsLoading ? <LoadingSpinner /> : (
          <Card title="All Recommendations">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2">Gemstone</th>
                    <th className="text-left py-3 px-2">Zodiac</th>
                    <th className="text-left py-3 px-2">Confidence</th>
                    <th className="text-left py-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendationsData?.recommendations.map((rec) => (
                    <tr key={rec._id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2">{rec.gemstoneName}</td>
                      <td className="py-3 px-2">{rec.zodiacSign}</td>
                      <td className="py-3 px-2">{rec.confidenceScore}%</td>
                      <td className="py-3 px-2">{new Date(rec.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )
      )}

      {activeTab === 'gemstones' && (
        gemsLoading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gemstones?.map((gem) => (
              <Card key={gem._id} title={gem.name}>
                {editingGem?._id === gem._id ? (
                  <GemstoneEditForm
                    gemstone={editingGem}
                    onSave={(data) => updateGemMutation.mutate({ id: gem._id, data })}
                    onCancel={() => setEditingGem(null)}
                    isLoading={updateGemMutation.isPending}
                  />
                ) : (
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Planet:</span> {gem.planet}</p>
                    <p><span className="text-gray-500">Metal:</span> {gem.recommendedMetal}</p>
                    <p><span className="text-gray-500">Day:</span> {gem.recommendedDay}</p>
                    <Button variant="secondary" size="sm" onClick={() => setEditingGem(gem)}>
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}

function GemstoneEditForm({
  gemstone,
  onSave,
  onCancel,
  isLoading,
}: {
  gemstone: Gemstone;
  onSave: (data: Partial<Gemstone>) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState({
    planet: gemstone.planet,
    recommendedMetal: gemstone.recommendedMetal,
    recommendedDay: gemstone.recommendedDay,
    wearingMethod: gemstone.wearingMethod,
  });

  return (
    <div className="space-y-3">
      <input
        className="w-full rounded border px-2 py-1 text-sm dark:bg-gray-700"
        value={form.planet}
        onChange={(e) => setForm({ ...form, planet: e.target.value })}
        placeholder="Planet"
      />
      <input
        className="w-full rounded border px-2 py-1 text-sm dark:bg-gray-700"
        value={form.recommendedMetal}
        onChange={(e) => setForm({ ...form, recommendedMetal: e.target.value })}
        placeholder="Metal"
      />
      <input
        className="w-full rounded border px-2 py-1 text-sm dark:bg-gray-700"
        value={form.recommendedDay}
        onChange={(e) => setForm({ ...form, recommendedDay: e.target.value })}
        placeholder="Day"
      />
      <textarea
        className="w-full rounded border px-2 py-1 text-sm dark:bg-gray-700"
        value={form.wearingMethod}
        onChange={(e) => setForm({ ...form, wearingMethod: e.target.value })}
        placeholder="Wearing method"
        rows={2}
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onSave(form)} isLoading={isLoading}>Save</Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
