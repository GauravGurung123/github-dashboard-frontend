import React from 'react';
import { User, Calendar, GitBranch, GitCommit, GitPullRequest, Star } from 'lucide-react';

interface UserProfileCardProps {
  user: {
    avatar_url: string;
    name: string;
    login: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
  };
  stats: {
    total_commits: number;
    total_prs: number;
    total_issues: number;
    stars_received: number;
  };
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, stats }) => {
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-20 h-20 rounded-full border-4 border-white/20"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
            <p className="text-blue-100">@{user.login}</p>
            {user.bio && <p className="mt-2 text-blue-100">{user.bio}</p>}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Repositories</p>
              <p className="font-semibold">{user.public_repos}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Stars</p>
              <p className="font-semibold">{stats.stars_received}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Followers</p>
              <p className="font-semibold">{user.followers}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Following</p>
              <p className="font-semibold">{user.following}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>Joined {joinDate}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <GitCommit className="w-6 h-6 mx-auto text-blue-600 mb-1" />
              <p className="text-sm text-gray-500">Commits</p>
              <p className="text-lg font-bold">{stats.total_commits}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <GitPullRequest className="w-6 h-6 mx-auto text-purple-600 mb-1" />
              <p className="text-sm text-gray-500">Pull Requests</p>
              <p className="text-lg font-bold">{stats.total_prs}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mx-auto text-green-600 mb-1">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p className="text-sm text-gray-500">Issues</p>
              <p className="text-lg font-bold">{stats.total_issues}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
