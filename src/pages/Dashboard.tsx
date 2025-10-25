import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { 
  GitCommit, 
  Code, 
  GitPullRequest, 
  GitBranch, 
  AlertCircle,
  Clock,
  User,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Loading } from '../components/common/Loading';
import { CommitChart } from '../components/dashboard/CommitChart';
import { CodeStatsChart } from '../components/dashboard/CodeStatsChart';
import { IssuesChart } from '../components/dashboard/IssuesChart';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { useDashboard } from '../hooks/useDashboard';
import { useAuth } from '../context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UserProfileCard } from '../components/dashboard/UserProfileCard';

// Time range options for filtering data
const TIME_RANGES = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: 'all', label: 'All time' },
];

export const Dashboard: React.FC = () => {
  const { owner: ownerParam, repo: repoParam, username: usernameParam } = useParams<{ 
    owner?: string; 
    repo?: string; 
    username?: string 
  }>();
  
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  
  // Determine the effective username (from URL or authenticated user)
  const username = usernameParam || user?.username;
  
  // If no user is authenticated, redirect to login
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  // Handle loading states
  if (isAuthLoading) {
    return <Loading message="Checking authentication..." />;
  }

  // If no username is available (not in URL and no authenticated user)
  if (!username) {
    return <div className="text-center py-8">User not found</div>;
  }

  // If owner/repo not provided, redirect to user's default dashboard
  if (!ownerParam || !repoParam) {
    // In a real app, you might fetch the user's default repo here
    // For now, we'll redirect to the repositories page
    return <Navigate to="/repositories" replace />;
  }
  
  const { dashboard, loading, error, refresh } = useDashboard(
    ownerParam,
    repoParam,
    username,
    timeRange === 'all' ? undefined : parseInt(timeRange)
  );

  if (loading) return <Loading message="Generating dashboard..." />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!dashboard) return <div className="text-center py-8">No data available</div>;

  const { metrics, charts, activity, user: dashboardUser } = dashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showBack onBack={() => navigate(-1)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <User className="w-6 h-6" />
                <h1 className="text-2xl md:text-3xl font-bold">{username}'s Dashboard</h1>
              </div>
              <div className="flex items-center gap-2 text-blue-100 text-sm md:text-base">
                <GitBranch className="w-4 h-4" />
                <span>{owner}/{repo}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-blue-700/50 px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[150px] bg-transparent border-0 text-white focus:ring-0 p-0 h-auto">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_RANGES.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => refresh()}
              >
                Refresh Data
              </Button>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <MetricCard 
              icon={<GitCommit className="w-5 h-5" />} 
              title="Total Commits" 
              value={metrics.total_commits}
              change={metrics.commit_change}
            />
            <MetricCard 
              icon={<GitPullRequest className="w-5 h-5" />} 
              title="Pull Requests" 
              value={metrics.pull_requests.total}
              change={metrics.pull_requests.change}
            />
            <MetricCard 
              icon={<AlertCircle className="w-5 h-5" />} 
              title="Issues" 
              value={metrics.issues.total}
              change={metrics.issues.change}
            />
            <MetricCard 
              icon={<Code className="w-5 h-5" />} 
              title="Code Changes" 
              value={`+${metrics.code_changes.additions} / -${metrics.code_changes.deletions}`}
              change={metrics.code_changes.change}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <UserProfileCard user={dashboardUser} 
                  stats={{
                    total_commits: metrics.commits.total,
                    total_prs: metrics.pull_requests.total,
                    total_issues: metrics.issues.total,
                    stars_received: dashboardUser.starred_repos_count || 0
                  }}
                />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Contributions</CardTitle>
                    <CardDescription>Your contribution statistics for this repository</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CommitChart data={charts.commits_timeline} />
                      <CodeStatsChart data={charts.code_changes} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pull Requests & Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <IssuesChart data={charts.issues_status} />
                      <IssuesChart data={charts.prs_status} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent contributions and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityTimeline activities={activity} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Detailed analysis of your contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Code Quality</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Code Review Coverage</span>
                          <span className="font-medium">{metrics.code_review.coverage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${metrics.code_review.coverage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Test Coverage</span>
                          <span className="font-medium">{metrics.test_coverage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${metrics.test_coverage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Contribution Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-700 mb-1">Files Changed</div>
                        <div className="text-2xl font-bold">{metrics.files_changed}</div>
                        <div className="text-xs text-blue-600">
                          {metrics.files_changed > 50 ? 'High' : 'Moderate'} impact
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-green-700 mb-1">Active Days</div>
                        <div className="text-2xl font-bold">{metrics.active_days}</div>
                        <div className="text-xs text-green-600">
                          {metrics.active_days > 15 ? 'Consistent' : 'Occasional'} contributor
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Helper component for metric cards
const MetricCard = ({ icon, title, value, change }: { icon: React.ReactNode, title: string, value: string | number, change?: number }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
    <div className="flex items-center justify-between">
      <div className="text-blue-100/80 text-sm">{title}</div>
      <div className="text-blue-100/60">{icon}</div>
    </div>
    <div className="mt-2">
      <div className="text-xl font-bold text-white">{value}</div>
      {change !== undefined && (
        <div className={`text-xs mt-1 ${
          change >= 0 ? 'text-green-300' : 'text-red-300'
        }`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last period
        </div>
      )}
    </div>
  </div>
);
