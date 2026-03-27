import apiClient from './apiClient';

export const moodService = {
  getMoodInsights: async () => {
    const response = await apiClient.get('/analytics/mood-insight');
    return response.data;
  },
  
  logMood: async (moodData: {
    intensity: number;
    symptoms: string[];
    journal: string;
    mediaType?: 'audio' | 'photo' | 'text';
  }) => {
    const response = await apiClient.post('/moods', moodData);
    return response.data;
  },

  getRecommendations: async () => {
    const response = await apiClient.get('/analytics/recommendations');
    return response.data;
  },
};
