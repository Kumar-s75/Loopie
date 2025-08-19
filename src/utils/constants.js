import Config from 'react-native-config';

export const API_KEYS = {
  GOOGLE_PLACES: Config.GOOGLE_PLACES_API_KEY,
  GOOGLE_MAPS: Config.GOOGLE_MAPS_API_KEY,
};

export const CLIENT_IDS = {
  GOOGLE_WEB: Config.GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS: Config.GOOGLE_IOS_CLIENT_ID,
};

// Validation function to check if required keys are present
export const validateApiKeys = () => {
  const missingKeys = [];
  
  if (!API_KEYS.GOOGLE_PLACES) missingKeys.push('GOOGLE_PLACES_API_KEY');
  if (!API_KEYS.GOOGLE_MAPS) missingKeys.push('GOOGLE_MAPS_API_KEY');
  if (!CLIENT_IDS.GOOGLE_WEB) missingKeys.push('GOOGLE_WEB_CLIENT_ID');
  if (!CLIENT_IDS.GOOGLE_IOS) missingKeys.push('GOOGLE_IOS_CLIENT_ID');
  
  if (missingKeys.length > 0) {
    console.warn('Missing environment variables:', missingKeys.join(', '));
    return false;
  }
  
  return true;
};