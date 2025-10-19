export interface DashboardFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  contributorType?: 'all' | 'core' | 'external';
}

export interface DashboardExport {
  format: 'pdf' | 'csv' | 'json';
  data: any;
}
