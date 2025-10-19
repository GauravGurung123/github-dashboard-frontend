import React from 'react';
import { GitBranch } from 'lucide-react';

export const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/login/github/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center">
          <GitBranch className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Sign in with your GitHub account to continue</p>
          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-semibold flex items-center justify-center"
          >
            <GitBranch className="w-5 h-5 mr-2" />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};
