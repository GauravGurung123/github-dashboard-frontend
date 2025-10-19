import { useState, useEffect } from 'react';
import { dashboardApi } from '../api/dashboardApi';
import { Dashboard } from '../types';

export const useDashboard = (owner: string, repo: string, username: string) => {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await dashboardApi.getDashboard(owner, repo, username);
        setDashboard(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard');
        setLoading(false);
      }
    };

    if (owner && repo && username) {
      fetchDashboard();
    }
  }, [owner, repo, username]);

  return { dashboard, loading, error };
};
