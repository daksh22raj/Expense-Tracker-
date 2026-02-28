// Automatically detect environment and set API URL
const getApiBaseUrl = () => {
  // Use environment variable if set (highest priority)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Production: same host (e.g. Render single service) or explicit backend URL
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!isLocalhost) {
    // Same origin when frontend and backend are deployed together (e.g. one Render web service)
    return '';
  }

  // Development: Use localhost backend
  return 'http://localhost:5000';
};

const API_BASE_URL = getApiBaseUrl();

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

