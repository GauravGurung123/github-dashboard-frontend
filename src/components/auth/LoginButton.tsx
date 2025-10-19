import React from 'react';
import { GitBranch } from 'lucide-react';

export const LoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/login/github/';
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
    >
      <GitBranch className="w-4 h-4 mr-2" />
      Login with GitHub
    </button>
  );
};
