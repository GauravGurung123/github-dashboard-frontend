import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch } from 'lucide-react';
import { GITHUB_LOGIN_URL } from '../api/config';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-4">
            <div
                className="space-y-6 max-w-2xl w-full text-center bg-white/10 rounded-2xl shadow-lg p-10 backdrop-blur-md">
                <div className="bg-green-500 text-white p-6 rounded-xl text-center text-2xl">
                    Welcome to GitHub Dashboard!
                </div>
                <GitBranch className="w-16 h-16 mx-auto mb-6 text-blue-400"/>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-relaxed">
                    GitHub Projects Dashboard
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed tracking-wide">
                    Visualize contributor metrics and project insights with beautiful dashboards.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href={`${GITHUB_LOGIN_URL}`}
                        className="w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold text-center shadow-md"
                    >
                        Login with GitHub
                    </a>
                    <button
                        onClick={() => navigate('/repositories')}
                        className="w-auto px-6 py-3 bg-transparent text-white rounded-lg hover:bg-blue-900/30 transition text-lg font-semibold border border-blue-500"
                    >
                        Browse Repositories
                    </button>
                </div>
            </div>
        </div>
    );
};
