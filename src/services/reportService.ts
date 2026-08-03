import { PredictionResult } from '../types';

// TODO: Connect Python backend
// TODO: Generate PDF using report.py
// TODO: Save report inside reports/

export const reportService = {
  async generatePdfReport(prediction: PredictionResult): Promise<{ downloadUrl: string; fileName: string }> {
    // Simulate server side report rendering latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const fileName = `CortexVision_Report_${prediction.patientId}_${prediction.id}.pdf`;

    /*
    // Future backend python call:
    // const response = await fetch('/generate-report', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(prediction)
    // });
    // const blob = await response.blob();
    */

    return {
      downloadUrl: '#',
      fileName
    };
  }
};
