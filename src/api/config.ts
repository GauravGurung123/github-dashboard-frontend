
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const GITHUB_LOGIN_URL = `${API_BASE_URL}/auth/login/github/`;
