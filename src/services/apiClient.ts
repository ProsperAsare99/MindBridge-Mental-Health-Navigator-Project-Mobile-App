import axios from 'axios';
import storage from '../utils/storage';

// Uses Expo's built-in environment variables from the .env file
// Fallback is 192.168.1.100 for emulators or testing if .env is not found
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.100:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add JWT Token to headers
apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token on authentication failure
      await storage.deleteItemAsync('userToken');
      // Potential redirect to login logic here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
