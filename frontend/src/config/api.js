const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    ME: `${API_BASE_URL}/api/auth/me`,
  },
  INCOME: {
    BASE: `${API_BASE_URL}/api/income`,
    STATS: `${API_BASE_URL}/api/income/stats`,
    EXPORT: `${API_BASE_URL}/api/income/export`,
  },
  EXPENSE: {
    BASE: `${API_BASE_URL}/api/expense`,
    STATS: `${API_BASE_URL}/api/expense/stats`,
    EXPORT: `${API_BASE_URL}/api/expense/export`,
  },
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;

