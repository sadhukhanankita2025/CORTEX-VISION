export type ThemeMode = 'light' | 'dark';

export type TumorType = 'Glioma' | 'Meningioma' | 'Pituitary' | 'No Tumor';

export interface PredictionResult {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone?: string;
  email?: string;
  hospital: string;
  doctor: string;
  examinationDate: string;
  symptoms: string;
  notes?: string;
  
  // Model prediction outputs
  tumorDetected: boolean;
  predictionClass: TumorType;
  confidence: number; // e.g. 94.81
  inferenceTime: string; // e.g. "0.82 sec"
  modelUsed: string; // e.g. "EfficientNetB0 (best_brain_tumor_model.pth)"
  
  // Images
  mriImageUrl: string;
  heatmapImageUrl?: string; // Grad-CAM visualization
  
  // Medical summary & recommendations
  aiSummary: string;
  recommendations: string[];
  severity: 'Low' | 'Moderate' | 'High' | 'Critical' | 'None';
  status: 'Completed' | 'Pending Review' | 'Archived';
  createdAt: string;
}

export interface PatientInfo {
  patientId: string;
  patientName: string;
  age: number | string;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  hospital: string;
  doctor: string;
  symptoms: string;
  notes: string;
  examinationDate: string;
  mriFileName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Doctor' | 'Researcher' | 'Student' | 'Admin';
  hospitalName: string;
  avatarUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

export interface HealthCheckStatus {
  status: 'connected' | 'disconnected' | 'mock';
  modelLoaded: boolean;
  modelName: string;
  modelPath: string;
  backendUrl: string;
  device: string; // e.g., 'CUDA / GPU' or 'CPU'
}
