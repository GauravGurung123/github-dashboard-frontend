import { useState, useEffect } from 'react';
import { repositoryApi } from '../api/repositoryApi';
import type {Repository} from '../types';

export const useRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const data = await repositoryApi.getRepositories();
        setRepositories(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch repositories');
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  return { repositories, loading, error };
};
