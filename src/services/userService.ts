import apiClient from './apiClient';

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    institution: string;
    joinDate: string;
    avatarUrl?: string;
    stats: {
        totalReflections: number;
        completedChallenges: number;
        supportActions: number;
    };
}

export interface UserPreferences {
    darkMode: boolean;
    notifications: boolean;
    zenReminder: boolean;
    biometrics: boolean;
}

const userService = {
    getProfile: async (): Promise<UserProfile> => {
        const response = await apiClient.get('/user/profile');
        return response.data;
    },
    updateProfile: async (data: Partial<UserProfile>) => {
        const response = await apiClient.patch('/user/profile', data);
        return response.data;
    },
    getPreferences: async (): Promise<UserPreferences> => {
        const response = await apiClient.get('/user/preferences');
        return response.data;
    },
    updatePreferences: async (data: Partial<UserPreferences>) => {
        const response = await apiClient.patch('/user/preferences', data);
        return response.data;
    }
};

export default userService;
