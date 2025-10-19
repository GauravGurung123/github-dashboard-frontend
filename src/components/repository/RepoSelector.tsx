import React from 'react';
import { GitBranch } from 'lucide-react';
import { Repository } from '../../types';

interface RepoSelectorProps {
  repositories: Repository[];
  onSelect: (repo: Repository) => void;
  loading?: boolean;
}

export const RepoSelector: React.FC<RepoSelectorProps> = ({ repositories, onSelect, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Loading repositories...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select a Repository</h2>
      <div className="grid gap-4">
        {repositories.map((repo) => (
          <div
            key={repo.full_name}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => onSelect(repo)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-600">{repo.full_name}</h3>
                <p className="text-gray-600 mt-1">{repo.description || 'No description'}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center">
                    <GitBranch className="w-4 h-4 mr-1" />
                    {repo.language || 'Unknown'}
                  </span>
                  <span>⭐ {repo.stars}</span>
                  <span>🍴 {repo.forks}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
