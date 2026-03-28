import axios from 'axios';
import storage from '../utils/storage';

// Placeholder for server IP - To be updated by user or environment variable
// Use a fixed placeholder for the server IP - Update this for local testing
const BASE_URL = 'http://192.168.1.100:5000/api';

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
