import { GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from "react";
import { GITHUB_LOGIN_URL } from "../../api/config";

export const Navbar: React.FC<{ onBack?: () => void; showBack?: boolean }> = ({
                                                                                  onBack,
                                                                                  showBack = false
                                                                              }) => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <GitBranch className="w-8 h-8 text-blue-600 mr-2" />
                        <h1 className="text-xl font-bold text-gray-900">GitHub Dashboard</h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        {showBack && onBack && (
                            <button
                                onClick={onBack}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                            >
                                ← Back
                            </button>
                        )}
<                       a
                        href={GITHUB_LOGIN_URL}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                        Login with GitHub
                    </a>
                </div>
            </div>
        </div>
</nav>
);
};