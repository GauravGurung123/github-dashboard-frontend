import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { RepoList } from '../components/repository/RepoList';
import { useRepository } from '../context/RepositoryContext';
import type {Contributor} from '../types';

export const RepositoryDetail: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const navigate = useNavigate();
  const { selectedRepo, setSelectedContributor } = useRepository();

  const handleContributorSelect = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    navigate(`/dashboard/${owner}/${repo}/${contributor.username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showBack onBack={() => navigate('/repositories')} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Repository: {selectedRepo?.full_name || `${owner}/${repo}`}
          </h2>
          {selectedRepo?.description && (
            <p className="text-gray-600 mt-2">{selectedRepo.description}</p>
          )}
        </div>
        <RepoList owner={owner!} repo={repo!} onSelectContributor={handleContributorSelect} />
      </main>
    </div>
  );
};
