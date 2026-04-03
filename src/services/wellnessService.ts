import apiClient from './apiClient';

export interface Correlation {
    factor: string;
    impact: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
    description: string;
    score: number;
}

export interface DeepDiveData {
    correlations: Correlation[];
    participationStats: {
        totalCircleShares: number;
        carePlanAdherence: number;
        meditationConsistency: number;
    };
    forecast: 'STABLE' | 'TRANSITIONING' | 'RECOVERING';
}

export interface GamificationStats {
    wellnessLevel: number;
    wellnessXP: number;
    streak: number;
    garden: {
        healthScore: number;
        growthLevel: number;
    };
}

const wellnessService = {
    getDeepDive: async (): Promise<DeepDiveData> => {
        const response = await apiClient.get('/analytics/deep-dive');
        return response.data;
    },
    
    getStats: async (): Promise<GamificationStats> => {
        const response = await apiClient.get('/gamification/stats');
        return response.data;
    },
    
    getChallenges: async () => {
        const response = await apiClient.get('/gamification/challenges');
        return response.data;
    },
    
    joinChallenge: async (id: string) => {
        const response = await apiClient.post(`/gamification/challenges/${id}/join`);
        return response.data;
    },
    
    rewardXP: async (type: string, xp: number) => {
        const response = await apiClient.post('/gamification/reward', { type, xp });
        return response.data;
    }
};

export default wellnessService;
