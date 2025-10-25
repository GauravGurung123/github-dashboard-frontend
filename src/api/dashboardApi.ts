import { apiClient } from './client';
import {type Dashboard } from '../types';

export const dashboardApi = {
  async getDashboard(owner: string, repo: string, username: string, timeRange?: number): Promise<Dashboard> {
    const params = new URLSearchParams();
    if (timeRange) {
      params.append('time_range', timeRange.toString());
    }
    const response = await apiClient.get(`/dashboard/${owner}/${repo}/${username}/?${params.toString()}`);
    return response.data;
  },

  async generateAllDashboards(owner: string, repo: string): Promise<{ message: string; count: number }> {
    const response = await apiClient.post(`/dashboard/${owner}/${repo}/generate-all/`);
    return response.data;
  },
};
