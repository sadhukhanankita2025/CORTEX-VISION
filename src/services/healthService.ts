import { HealthCheckStatus } from '../types';

// TODO: Connect Python backend
// TODO: Call /api/health to verify the hybrid Keras model loaded in memory

export const healthService = {
  async checkBackendHealth(): Promise<HealthCheckStatus> {
    // Simulated short network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // When Python backend is running locally (e.g., http://localhost:5000 or http://localhost:8000),
    // you will replace this with:
    /*
    try {
      const response = await fetch('http://localhost:5000/health');
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn('Backend unavailable, using mock status');
    }
    */

    return {
      status: 'mock',
      modelLoaded: true,
      modelName: 'Hybrid ResNet50 + EfficientNetB0',
      modelPath: 'backend/hybrid_resnet50_efficientnetb0.keras',
      backendUrl: 'http://localhost:5000/api/v1',
      device: 'CUDA:0 (NVIDIA RTX 4090 / Edge GPU)'
    };
  }
};
