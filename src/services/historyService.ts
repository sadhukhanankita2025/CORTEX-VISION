import { PredictionResult } from '../types';
import { MOCK_PREDICTIONS } from '../data/mockData';

// TODO: Connect Python backend
// TODO: GET /history
// TODO: GET /patient/:id

let localHistory: PredictionResult[] = [...MOCK_PREDICTIONS];

export const historyService = {
  async getHistory(): Promise<PredictionResult[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...localHistory];
  },

  async addPrediction(prediction: PredictionResult): Promise<void> {
    localHistory = [prediction, ...localHistory];
  },

  async getPatientRecord(patientId: string): Promise<PredictionResult | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return localHistory.find((item) => item.patientId === patientId || item.id === patientId);
  },

  async deletePrediction(id: string): Promise<void> {
    localHistory = localHistory.filter((item) => item.id !== id);
  }
};
