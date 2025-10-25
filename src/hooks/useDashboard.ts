import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api/dashboardApi';
import type { Dashboard } from '../types';

export const useDashboard = (owner: string, repo: string, username: string, timeRange?: number) => {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!owner || !repo || !username) return;
    
    try {
      setLoading(true);
      const data = await dashboardApi.getDashboard(owner, repo, username, timeRange);
      setDashboard(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard');
      throw err; // Re-throw to allow error handling in components
    } finally {
      setLoading(false);
    }
  }, [owner, repo, username, timeRange]);

  useEffect(() => {
    fetchDashboard().catch(() => {
      // Error is already handled in fetchDashboard
    });
  }, [fetchDashboard]);

  return { 
    dashboard, 
    loading, 
    error, 
    refresh: fetchDashboard 
  };
};
