import apiClient from './apiClient';

export interface CrisisContact {
    id: string;
    name: string;
    phone: string;
    type: 'EMERGENCY' | 'SUPPORT' | 'HOTLINE';
    availability: string;
}

export interface SupportCenter {
    id: string;
    name: string;
    address: string;
    distance: string;
    coordinates?: { lat: number; lng: number };
}

const crisisService = {
    getContacts: async (): Promise<CrisisContact[]> => {
        const response = await apiClient.get('/crisis/contacts');
        return response.data;
    },
    getNearbyCenters: async (): Promise<SupportCenter[]> => {
        const response = await apiClient.get('/crisis/nearby');
        return response.data;
    }
};

export default crisisService;
