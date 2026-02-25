
import { useState, useEffect, useCallback } from 'react';
import type { Recommendation } from '../types';
import apiService from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { CircularProgress } from '../components/CircularProgress';

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getRecommendations();
      setRecommendations(data);
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const handleRecalculate = async () => {
    setIsGenerating(true);
    try {
      await apiService.generateRecommendations();
      // After generation is triggered, refetch the recommendations
      await fetchRecommendations();
    } catch (error) {
      console.error("Failed to generate recommendations", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Career Recommendations</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Based on your profile, here are your top career matches.</p>
        </div>
        <Button onClick={handleRecalculate} disabled={isGenerating || isLoading}>
          {isGenerating ? 'Recalculating...' : 'Recalculate Matches'}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-20 w-20 rounded-full" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle>{rec.career_path.name}</CardTitle>
                    <CardDescription className="mt-2 text-primary font-semibold">Match Score</CardDescription>
                  </div>
                  <CircularProgress value={rec.match_score} />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {rec.career_path.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;
