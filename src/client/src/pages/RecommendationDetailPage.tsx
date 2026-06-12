import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecommendationById, downloadPdf, downloadJson } from '../services/recommendationApi';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { useState } from 'react';

export function RecommendationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [exporting, setExporting] = useState<'pdf' | 'json' | null>(null);

  const { data: recommendation, isLoading, error } = useQuery({
    queryKey: ['recommendation', id],
    queryFn: () => getRecommendationById(id!),
    enabled: !!id,
  });

  const handleExportPdf = async () => {
    if (!id) return;
    setExporting('pdf');
    try {
      await downloadPdf(id);
    } finally {
      setExporting(null);
    }
  };

  const handleExportJson = async () => {
    if (!id) return;
    setExporting('json');
    try {
      await downloadJson(id);
    } finally {
      setExporting(null);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading recommendation..." />;

  if (error || !recommendation) {
    return (
      <EmptyState
        title="Recommendation not found"
        description="This recommendation may have been removed or you don't have access."
        action={
          <Link to="/dashboard">
            <Button variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleExportPdf} isLoading={exporting === 'pdf'}>
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExportJson} isLoading={exporting === 'json'}>
            <FileText className="h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </div>

      <RecommendationCard recommendation={recommendation} />
    </div>
  );
}
