import { apiClient } from './client';
import { Repository, Contributor } from '../types';

export const repositoryApi = {
  async getRepositories(): Promise<Repository[]> {
    const response = await apiClient.get('/repositories/');
    return response.data;
  },

  async getContributors(owner: string, repo: string): Promise<Contributor[]> {
    const response = await apiClient.get(`/repositories/${owner}/${repo}/contributors/`);
    return response.data;
  },
};
