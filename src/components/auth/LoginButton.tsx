import React from 'react';
import { GitBranch } from 'lucide-react';
import { GITHUB_LOGIN_URL } from '../../api/config';
export const LoginButton: React.FC = () => {
    const handleLogin = () => {
        window.location.href = GITHUB_LOGIN_URL;
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