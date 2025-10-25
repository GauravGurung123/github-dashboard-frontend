import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch } from 'lucide-react';
import { GITHUB_LOGIN_URL } from '../api/config';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                <GitBranch className="w-24 h-24 mx-auto mb-6 text-blue-600" />
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                    GitHub Projects Dashboard
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8">
                    Visualize contributor metrics and project insights with beautiful dashboards
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                    href={GITHUB_LOGIN_URL}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold text-center"
                    >
                    Login with GitHub
                </a>
                <button
                    onClick={() => navigate('/repositories')}
                    className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition text-lg font-semibold border-2 border-blue-600"
                >
                    Browse Repositories
                </button>
            </div>
        </div>
</div>
);
};