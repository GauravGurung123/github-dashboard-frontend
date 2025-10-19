import React, { useState, useEffect } from 'react';
import { repositoryApi } from '../../api/repositoryApi';
import { Contributor } from '../../types';

interface RepoListProps {
  owner: string;
  repo: string;
  onSelectContributor: (contributor: Contributor) => void;
}

export const RepoList: React.FC<RepoListProps> = ({ owner, repo, onSelectContributor }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const data = await repositoryApi.getContributors(owner, repo);
        setContributors(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch contributors:', error);
        setLoading(false);
      }
    };

    fetchContributors();
  }, [owner, repo]);

  if (loading) {
    return <div className="text-center py-8">Loading contributors...</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Select a Contributor</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contributors.map((contributor) => (
          <div
            key={contributor.username}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer text-center"
            onClick={() => onSelectContributor(contributor)}
          >
            <img
              src={contributor.avatar_url}
              alt={contributor.username}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="font-semibold">{contributor.username}</p>
            <p className="text-sm text-gray-500">{contributor.contributions} contributions</p>
          </div>
        ))}
      </div>
    </div>
  );
};
