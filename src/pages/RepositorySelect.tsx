import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { RepoSelector } from '../components/repository/RepoSelector';
import { Loading } from '../components/common/Loading';
import { useRepositories } from '../hooks/useRepository';
import { useRepository } from '../context/RepositoryContext';
import { Repository } from '../types';

export const RepositorySelect: React.FC = () => {
  const navigate = useNavigate();
  const { repositories, loading, error } = useRepositories();
  const { setSelectedRepo } = useRepository();

  const handleRepoSelect = (repo: Repository) => {
    setSelectedRepo(repo);
    navigate(`/repository/${repo.owner}/${repo.name}`);
  };

  if (loading) return <Loading message="Loading repositories..." />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showBack onBack={() => navigate('/')} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RepoSelector repositories={repositories} onSelect={handleRepoSelect} />
      </main>
    </div>
  );
};
