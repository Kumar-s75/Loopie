import axios from 'axios';
import {API_CONFIG, createApiUrl} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      AsyncStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  },
);

export const apiService = {
  // Auth
  googleLogin: (idToken) => apiClient.post(API_CONFIG.ENDPOINTS.GOOGLE_LOGIN, {idToken}),
  
  // User
  getUser: (userId) => apiClient.get(`${API_CONFIG.ENDPOINTS.USER}/${userId}`),
  
  // Trips
  createTrip: (tripData) => apiClient.post(API_CONFIG.ENDPOINTS.TRIP, tripData),
  getTrips: (userId) => apiClient.get(`${API_CONFIG.ENDPOINTS.TRIPS}/${userId}`),
  getTripPlaces: (tripId) => apiClient.get(`${API_CONFIG.ENDPOINTS.TRIP}/${tripId}/placesToVisit`),
  addPlaceToTrip: (tripId, placeId) => apiClient.post(`${API_CONFIG.ENDPOINTS.TRIP}/${tripId}/addPlace`, {placeId}),
  
  // Itinerary
  getItinerary: (tripId) => apiClient.get(`${API_CONFIG.ENDPOINTS.TRIP}/${tripId}/itinerary`),
  addActivity: (tripId, date, activity) => apiClient.post(`${API_CONFIG.ENDPOINTS.TRIPS}/${tripId}/itinerary/${date}`, activity),
  
  // Expenses
  setBudget: (tripId, budget) => apiClient.put(`/setBudget/${tripId}`, {budget}),
  addExpense: (tripId, expense) => apiClient.post(`/addExpense/${tripId}`, expense),
  getExpenses: (tripId) => apiClient.get(`/getExpenses/${tripId}`),
};