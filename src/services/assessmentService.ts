import apiClient from './apiClient';

export interface Assessment {
    id: string;
    title: string;
    description: string;
    questionCount: number;
    category: 'CLINICAL' | 'ACADEMIC' | 'LIFESTYLE';
    lastTaken?: string;
    lastScore?: number;
    severity?: 'NORMAL' | 'MILD' | 'MODERATE' | 'SEVERE';
}

export interface Question {
    id: string;
    text: string;
    options: { text: string; value: number }[];
}

const assessmentService = {
    getAvailable: async (): Promise<Assessment[]> => {
        const response = await apiClient.get('/assessments');
        return response.data;
    },
    getQuestions: async (id: string): Promise<Question[]> => {
        const response = await apiClient.get(`/assessments/${id}/questions`);
        return response.data;
    },
    submitResult: async (id: string, answers: { questionId: string; value: number }[]) => {
        const response = await apiClient.post(`/assessments/${id}/submit`, { answers });
        return response.data;
    },
    getHistory: async () => {
        const response = await apiClient.get('/assessments/history');
        return response.data;
    }
};

export default assessmentService;
