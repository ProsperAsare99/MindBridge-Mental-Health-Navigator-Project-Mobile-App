import apiClient from './apiClient';

export interface Circle {
    id: string;
    name: string;
    memberCount: number;
    description: string;
    lastActive: string;
}

export interface Story {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    likes: number;
    tags: string[];
}

export interface Peer {
    id: string;
    name: string;
    status: 'ONLINE' | 'OFFLINE';
    lastMessage?: string;
}

const socialService = {
    getCircles: async (): Promise<Circle[]> => {
        const response = await apiClient.get('/social/circles');
        return response.data;
    },
    getStories: async (): Promise<Story[]> => {
        const response = await apiClient.get('/social/stories');
        return response.data;
    },
    getNetwork: async (): Promise<Peer[]> => {
        const response = await apiClient.get('/social/network');
        return response.data;
    }
};

export default socialService;
