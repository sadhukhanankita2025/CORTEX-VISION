import { PredictionResult, NotificationItem } from '../types';

// High quality realistic SVG/Canvas rendered MRI brain scan image placeholders
export const SAMPLE_MRI_IMAGES = {
  brainNormal: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" fill="none"><rect width="500" height="500" fill="%23090d16"/><ellipse cx="250" cy="250" rx="180" ry="210" fill="%231a2333" stroke="%2338bdf8" stroke-width="2" stroke-dasharray="4 4"/><path d="M250 80 C180 80, 100 150, 100 260 C100 370, 170 410, 250 410 C330 410, 400 370, 400 260 C400 150, 320 80, 250 80 Z" fill="%23141e2e" stroke="%2364748b" stroke-width="3"/><path d="M250 90 Q170 140 160 250 Q160 360 250 400 Q340 360 340 250 Q330 140 250 90 Z" fill="%23223147" opacity="0.8"/><path d="M200 180 C230 160, 270 160, 300 180 C320 220, 310 280, 280 320 C240 340, 210 320, 200 280 Z" fill="%23334155" opacity="0.9"/><circle cx="250" cy="230" r="45" fill="%231e293b" stroke="%2338bdf8" stroke-width="1.5"/><text x="20" y="470" fill="%2306b6d4" font-family="monospace" font-size="14">MRI T1-WEIGHTED [NORMAL SCAN]</text></svg>',
  
  brainGlioma: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" fill="none"><rect width="500" height="500" fill="%23090d16"/><ellipse cx="250" cy="250" rx="180" ry="210" fill="%231a2333" stroke="%23f43f5e" stroke-width="2"/><path d="M250 80 C180 80, 100 150, 100 260 C100 370, 170 410, 250 410 C330 410, 400 370, 400 260 C400 150, 320 80, 250 80 Z" fill="%23141e2e" stroke="%2364748b" stroke-width="3"/><path d="M250 90 Q170 140 160 250 Q160 360 250 400 Q340 360 340 250 Q330 140 250 90 Z" fill="%23223147"/><circle cx="180" cy="200" r="42" fill="%23f43f5e" opacity="0.85"/><circle cx="180" cy="200" r="30" fill="%23ffe4e6" opacity="0.9"/><circle cx="180" cy="200" r="58" fill="none" stroke="%23fb7185" stroke-width="2" stroke-dasharray="3 3"/><text x="20" y="470" fill="%23f43f5e" font-family="monospace" font-size="14">MRI AXIAL - GLIOMA TISSUE DETECTED</text></svg>',
  
  brainMeningioma: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" fill="none"><rect width="500" height="500" fill="%23090d16"/><ellipse cx="250" cy="250" rx="180" ry="210" fill="%231a2333" stroke="%23a855f7" stroke-width="2"/><path d="M250 80 C180 80, 100 150, 100 260 C100 370, 170 410, 250 410 C330 410, 400 370, 400 260 C400 150, 320 80, 250 80 Z" fill="%23141e2e" stroke="%2364748b" stroke-width="3"/><path d="M310 160 Q340 200 330 250" stroke="%23a855f7" stroke-width="24" stroke-linecap="round" opacity="0.85"/><circle cx="320" cy="200" r="28" fill="%23e9d5ff" opacity="0.95"/><text x="20" y="470" fill="%23c084fc" font-family="monospace" font-size="14">MRI SAGITTAL - MENINGIOMA MASS</text></svg>',

  brainPituitary: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" fill="none"><rect width="500" height="500" fill="%23090d16"/><ellipse cx="250" cy="250" rx="180" ry="210" fill="%231a2333" stroke="%23eab308" stroke-width="2"/><path d="M250 80 C180 80, 100 150, 100 260 C100 370, 170 410, 250 410 C330 410, 400 370, 400 260 C400 150, 320 80, 250 80 Z" fill="%23141e2e" stroke="%2364748b" stroke-width="3"/><ellipse cx="250" cy="310" rx="35" ry="25" fill="%23eab308" opacity="0.9"/><ellipse cx="250" cy="310" rx="20" ry="14" fill="%23fef08a" opacity="0.95"/><text x="20" y="470" fill="%23facc15" font-family="monospace" font-size="14">MRI CORONAL - PITUITARY REGION LESION</text></svg>'
};

export const MOCK_PREDICTIONS: PredictionResult[] = [
  {
    id: 'NV-2026-0981',
    patientId: 'PT-100001',
    patientName: 'ABC',
    age: 30,
    gender: 'Male',
    phone: '+1 (555) 000-0000',
    email: 'abc@hospital.com',
    hospital: 'ABC Medical Center',
    doctor: 'Dr. ABC, MD',
    examinationDate: '2026-07-28',
    symptoms: 'Routine cranial MRI scan evaluation.',
    notes: 'Contrast-enhanced T1-weighted MRI coronal and axial slices.',
    tumorDetected: true,
    predictionClass: 'Glioma',
    confidence: 96.42,
    inferenceTime: '0.78 sec',
    modelUsed: 'EfficientNetB0 (best_brain_tumor_model.pth)',
    mriImageUrl: SAMPLE_MRI_IMAGES.brainGlioma,
    heatmapImageUrl: SAMPLE_MRI_IMAGES.brainGlioma,
    aiSummary: 'Deep feature activation map indicates a high-density hyperintense intra-axial focal lesion in the left frontal lobe consistent with Glioma stage parameters.',
    recommendations: [
      'Urgent surgical neuro-oncology consult recommended within 5 business days.',
      'Schedule contrast-enhanced 3T stereotactic MRI for surgical mapping.',
      'Consider MR spectroscopy to evaluate choline-to-creatine ratios.'
    ],
    severity: 'High',
    status: 'Completed',
    createdAt: '2026-07-28 10:14 AM'
  },
  {
    id: 'NV-2026-0982',
    patientId: 'PT-987655',
    patientName: 'Marcus Thorne',
    age: 54,
    gender: 'Male',
    phone: '+1 (555) 876-5432',
    email: 'm.thorne@example.com',
    hospital: 'Mayo Clinic Healthcare',
    doctor: 'Dr. Robert Chen, MD',
    examinationDate: '2026-07-30',
    symptoms: 'Progressive right-sided hearing loss, mild facial numbness.',
    notes: 'Standard diagnostic protocol T2 MRI scan.',
    tumorDetected: true,
    predictionClass: 'Meningioma',
    confidence: 94.81,
    inferenceTime: '0.82 sec',
    modelUsed: 'EfficientNetB0 (best_brain_tumor_model.pth)',
    mriImageUrl: SAMPLE_MRI_IMAGES.brainMeningioma,
    heatmapImageUrl: SAMPLE_MRI_IMAGES.brainMeningioma,
    aiSummary: 'Extra-axial dural-based extra-parenchymal enhancing lesion noted along the sagittal sinus region, characteristic of Meningioma.',
    recommendations: [
      'Schedule follow-up MRI in 3 months to monitor expansion velocity.',
      'Surgical resection evaluation if neurological deficits increase.',
      'Perform neurological baseline monitoring test.'
    ],
    severity: 'Moderate',
    status: 'Completed',
    createdAt: '2026-07-30 02:45 PM'
  },
  {
    id: 'NV-2026-0983',
    patientId: 'PT-987656',
    patientName: 'Sophia Martinez',
    age: 32,
    gender: 'Female',
    phone: '+1 (555) 345-6789',
    email: 'sophia.m@example.com',
    hospital: 'Stanford Health Care',
    doctor: 'Dr. Amanda Willis, MD',
    examinationDate: '2026-08-01',
    symptoms: 'Bitemporal hemianopsia, endocrine fatigue, hormone imbalance.',
    notes: 'Dedicated sella turcica MRI thin-slice acquisition.',
    tumorDetected: true,
    predictionClass: 'Pituitary',
    confidence: 95.12,
    inferenceTime: '0.74 sec',
    modelUsed: 'EfficientNetB0 (best_brain_tumor_model.pth)',
    mriImageUrl: SAMPLE_MRI_IMAGES.brainPituitary,
    heatmapImageUrl: SAMPLE_MRI_IMAGES.brainPituitary,
    aiSummary: 'Hyper-intense sellar mass expansion pushing superiorly toward optic chiasm detected by CNN spatial feature maps.',
    recommendations: [
      'Endocrinology blood panel workup (ACTH, Prolactin, Growth Hormone).',
      'Neuro-ophthalmology visual field mapping.',
      'Evaluation for potential transsphenoidal endoscopic surgery.'
    ],
    severity: 'Moderate',
    status: 'Completed',
    createdAt: '2026-08-01 11:20 AM'
  },
  {
    id: 'NV-2026-0984',
    patientId: 'PT-987657',
    patientName: 'David K. Miller',
    age: 29,
    gender: 'Male',
    phone: '+1 (555) 998-1122',
    email: 'd.miller@example.com',
    hospital: 'Massachusetts General Hospital',
    doctor: 'Dr. James Patterson, MD',
    examinationDate: '2026-08-02',
    symptoms: 'Mild post-concussion routine evaluation, no active focal neurological signs.',
    notes: 'Volumetric brain scan without intravenous contrast.',
    tumorDetected: false,
    predictionClass: 'No Tumor',
    confidence: 99.15,
    inferenceTime: '0.69 sec',
    modelUsed: 'EfficientNetB0 (best_brain_tumor_model.pth)',
    mriImageUrl: SAMPLE_MRI_IMAGES.brainNormal,
    heatmapImageUrl: SAMPLE_MRI_IMAGES.brainNormal,
    aiSummary: 'Parenchymal architecture is preserved without focal signal abnormality, midline shift, or mass effect. Brain parenchyma is within normal radiological limits.',
    recommendations: [
      'No neuro-oncological intervention required.',
      'Routine follow-up per primary physician protocol.'
    ],
    severity: 'None',
    status: 'Completed',
    createdAt: '2026-08-02 09:05 AM'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Model Loaded Successfully',
    message: 'Local Edge PyTorch model best_brain_tumor_model.pth is ready for inference.',
    timestamp: '10 mins ago',
    type: 'success',
    read: false
  },
  {
    id: 'notif-2',
    title: 'New MRI Prediction Generated',
    message: 'Patient PT-987654 report was exported to PDF.',
    timestamp: '1 hour ago',
    type: 'info',
    read: false
  },
  {
    id: 'notif-3',
    title: 'System Calibration',
    message: 'Cortex Vision overall model inference accuracy updated to 94.81%.',
    timestamp: '1 day ago',
    type: 'info',
    read: true
  }
];

export const DASHBOARD_STATS = {
  totalPatients: 12450,
  predictionsToday: 148,
  modelAccuracy: '94.81%',
  reportsGenerated: 11820,
  tumorDistribution: [
    { name: 'Glioma', value: 38, color: '#f43f5e' },
    { name: 'Meningioma', value: 27, color: '#a855f7' },
    { name: 'Pituitary', value: 19, color: '#eab308' },
    { name: 'No Tumor', value: 16, color: '#10b981' }
  ],
  monthlyTrend: [
    { month: 'Jan', Scans: 850, Glioma: 310, Meningioma: 220, Pituitary: 180, Normal: 140 },
    { month: 'Feb', Scans: 940, Glioma: 350, Meningioma: 240, Pituitary: 190, Normal: 160 },
    { month: 'Mar', Scans: 1120, Glioma: 410, Meningioma: 300, Pituitary: 230, Normal: 180 },
    { month: 'Apr', Scans: 1250, Glioma: 480, Meningioma: 330, Pituitary: 250, Normal: 190 },
    { month: 'May', Scans: 1400, Glioma: 520, Meningioma: 370, Pituitary: 280, Normal: 230 },
    { month: 'Jun', Scans: 1580, Glioma: 600, Meningioma: 420, Pituitary: 310, Normal: 250 },
    { month: 'Jul', Scans: 1720, Glioma: 650, Meningioma: 460, Pituitary: 340, Normal: 270 }
  ]
};
