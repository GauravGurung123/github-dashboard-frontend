import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type {Repository, Contributor} from '../types';

interface RepositoryContextType {
  selectedRepo: Repository | null;
  setSelectedRepo: (repo: Repository | null) => void;
  selectedContributor: Contributor | null;
  setSelectedContributor: (contributor: Contributor | null) => void;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const RepositoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);

  return (
    <RepositoryContext.Provider
      value={{
        selectedRepo,
        setSelectedRepo,
        selectedContributor,
        setSelectedContributor,
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepository = () => {
  const context = useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error('useRepository must be used within a RepositoryProvider');
  }
  return context;
};
