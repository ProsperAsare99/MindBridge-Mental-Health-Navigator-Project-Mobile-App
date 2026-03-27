import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Placeholder for server IP - To be updated by user or environment variable
const BASE_URL = 'http://127.0.0.1:5000/api';

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
    const token = await SecureStore.getItemAsync('userToken');
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
      await SecureStore.deleteItemAsync('userToken');
      // Potential redirect to login logic here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
