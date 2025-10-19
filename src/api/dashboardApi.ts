import { apiClient } from './client';
import { Dashboard } from '../types';

export const dashboardApi = {
  async getDashboard(owner: string, repo: string, username: string): Promise<Dashboard> {
    const response = await apiClient.get(`/dashboard/${owner}/${repo}/${username}/`);
    return response.data;
  },

  async generateAllDashboards(owner: string, repo: string): Promise<{ message: string; count: number }> {
    const response = await apiClient.post(`/dashboard/${owner}/${repo}/generate-all/`);
    return response.data;
  },
};
