import Config from 'react-native-config';

export const API_CONFIG = {
  BASE_URL: Config.API_BASE_URL || 'http://localhost:8000',
  GOOGLE_PLACES_API_KEY: Config.GOOGLE_PLACES_API_KEY,
  ENDPOINTS: {
    TRIPS: '/trips',
    TRIP: '/trip',
    USER: '/user',
    GOOGLE_LOGIN: '/google-login',
    ADD_PLACE: '/addPlace',
    EXPENSES: '/expenses',
  },
};

export const createApiUrl = (endpoint, params = '') => {
  return `${API_CONFIG.BASE_URL}${endpoint}${params}`;
};