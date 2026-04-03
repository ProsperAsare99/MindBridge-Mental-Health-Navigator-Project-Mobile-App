import apiClient from './apiClient';

export interface Resource {
    id: string;
    title: string;
    category: 'ARTICLE' | 'TOOL' | 'VIDEO' | 'EXERCISE';
    tags: string[];
    readTime?: string;
    description: string;
    imageUrl?: string;
}

const resourceService = {
    getAll: async (): Promise<Resource[]> => {
        const response = await apiClient.get('/resources');
        return response.data;
    },
    getByCategory: async (category: string): Promise<Resource[]> => {
        const response = await apiClient.get(`/resources?category=${category}`);
        return response.data;
    },
    search: async (query: string): Promise<Resource[]> => {
        const response = await apiClient.get(`/resources/search?q=${query}`);
        return response.data;
    }
};

export default resourceService;
