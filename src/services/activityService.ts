import apiClient from './apiClient';

export interface ActivityItem {
    id: string;
    type: 'MOOD' | 'JOURNAL' | 'ASSESSMENT' | 'CHALLENGE';
    title: string;
    description: string;
    timestamp: string;
    moodScore?: number;
    tags?: string[];
}

const activityService = {
    getUnifiedFeed: async (): Promise<ActivityItem[]> => {
        const response = await apiClient.get('/activity/feed');
        return response.data;
    },
    searchActivity: async (query: string): Promise<ActivityItem[]> => {
        const response = await apiClient.get(`/activity/search?q=${query}`);
        return response.data;
    }
};

export default activityService;
