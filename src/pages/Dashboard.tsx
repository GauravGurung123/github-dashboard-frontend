import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GitCommit, Code, AlertCircle, GitPullRequest } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Loading } from '../components/common/Loading';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { CommitChart } from '../components/dashboard/CommitChart';
import { CodeStatsChart } from '../components/dashboard/CodeStatsChart';
import { IssuesChart } from '../components/dashboard/IssuesChart';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { useDashboard } from '../hooks/useDashboard';

export const Dashboard: React.FC = () => {
  const { owner, repo, username } = useParams<{ owner: string; repo: string; username: string }>();
  const navigate = useNavigate();
  const { dashboard, loading, error } = useDashboard(owner!, repo!, username!);

  if (loading) return <Loading message="Generating dashboard..." />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!dashboard) return <div className="text-center py-8">No data available</div>;

  const { metrics, charts, summary } = dashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showBack onBack={() => navigate(-1)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">{username}'s Dashboard</h1>
          <p className="text-blue-100">Repository: {repo}</p>
          <div className="mt-4 flex gap-6">
            <div className="bg-blue-700 bg-opacity-50 rounded px-4 py-2">
              <p className="text-sm text-blue-100">Productivity Score</p>
              <p className="text-2xl font-bold">{summary.productivity_score}</p>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded px-4 py-2">
              <p className="text-sm text-blue-100">Engagement Level</p>
              <p className="text-2xl font-bold">{summary.engagement_level}</p>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded px-4 py-2">
              <p className="text-sm text-blue-100">Total Contributions</p>
              <p className="text-2xl font-bold">{summary.total_contributions}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DashboardCard
            icon={GitCommit}
            title="Total Commits"
            value={metrics.commits.total}
            subtitle={`+${metrics.commits.additions} / -${metrics.commits.deletions} lines`}
            color="#3b82f6"
          />
          <DashboardCard
            icon={Code}
            title="Net Code Change"
            value={metrics.commits.net_change}
            subtitle="Lines of code"
            color="#10b981"
          />
          <DashboardCard
            icon={AlertCircle}
            title="Issues"
            value={metrics.issues.total}
            subtitle={`${metrics.issues.closed} closed, ${metrics.issues.opened} open`}
            color="#f59e0b"
          />
          <DashboardCard
            icon={GitPullRequest}
            title="Pull Requests"
            value={metrics.pull_requests.total}
            subtitle={`${metrics.pull_requests.merged} merged (${metrics.pull_requests.merge_rate.toFixed(0)}%)`}
            color="#8b5cf6"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CommitChart data={charts.commits_timeline} />
          <CodeStatsChart data={charts.code_changes} />
          <IssuesChart data={charts.issues_status} />
          <IssuesChart data={charts.prs_status} />
        </div>

        {/* Recent Activity */}
        <ActivityTimeline activities={dashboard.recent_activity} />
      </main>
    </div>
  );
};
