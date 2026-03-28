import apiClient from './apiClient';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const moodService = {
  // Auth Services
  login: async (credentials: any): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },

  register: async (userData: any): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', userData);
    return data;
  },

  // Existing Mood Services
  getMoodLogs: async () => {
    const { data } = await apiClient.get('/moods');
    return data;
  },

  logMood: async (moodData: any) => {
    const { data } = await apiClient.post('/moods', moodData);
    return data;
  },
};

export default moodService;
