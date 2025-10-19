export interface User {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
}

export interface Repository {
  name: string;
  full_name: string;
  owner: string;
  description?: string;
  url: string;
  stars: number;
  forks: number;
  language?: string;
  created_at: string;
  updated_at: string;
}

export interface Contributor {
  username: string;
  avatar_url: string;
  profile_url: string;
  contributions: number;
  type?: string;
}

export interface DashboardMetrics {
  commits: {
    total: number;
    additions: number;
    deletions: number;
    net_change: number;
  };
  issues: {
    total: number;
    opened: number;
    closed: number;
    close_rate: number;
  };
  pull_requests: {
    total: number;
    merged: number;
    open: number;
    merge_rate: number;
  };
}

export interface ChartData {
  commits_timeline: Array<{ date: string; count: number }>;
  code_changes: Array<{ name: string; value: number }>;
  issues_status: Array<{ name: string; value: number }>;
  prs_status: Array<{ name: string; value: number }>;
}

export interface Dashboard {
  username: string;
  repository: string;
  generated_at: string;
  metrics: DashboardMetrics;
  charts: ChartData;
  recent_activity: any[];
  summary: {
    total_contributions: number;
    productivity_score: number;
    engagement_level: string;
  };
}
