// Automatically detect environment and set API URL
const getApiBaseUrl = () => {
  // Use environment variable if set (highest priority)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Check if we're in production (GitHub Pages)
  const isProduction = window.location.hostname === 'daksh22raj.github.io' || 
                       window.location.hostname.includes('github.io');
  
  // Production: Use your deployed backend URL
  // ⚠️ IMPORTANT: Replace 'YOUR_BACKEND_URL_HERE' with your actual deployed backend URL
  // Examples:
  // - Render: 'https://expense-tracker-backend.onrender.com'
  // - Railway: 'https://expense-tracker-backend.railway.app'
  // - Heroku: 'https://expense-tracker-backend.herokuapp.com'
  if (isProduction) {
    // TODO: Replace this with your actual backend deployment URL
    // Examples:
    // - Render: 'https://expense-tracker-backend.onrender.com'
    // - Railway: 'https://expense-tracker-backend.railway.app'
    // - Heroku: 'https://expense-tracker-backend.herokuapp.com'
    const PRODUCTION_BACKEND_URL = 'YOUR_BACKEND_URL_HERE';
    
    if (PRODUCTION_BACKEND_URL === 'YOUR_BACKEND_URL_HERE') {
      console.error('⚠️ Backend URL not configured! Please update frontend/src/config/api.js');
      // Return a placeholder that will fail gracefully
      return 'https://backend-not-configured.example.com';
    }
    
    return PRODUCTION_BACKEND_URL;
  }
  
  // Development: Use localhost
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

