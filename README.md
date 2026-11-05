# CORTEX-VISION

**CORTEX-VISION** is an AI-powered Brain Tumor MRI Classification and Explainability System that enables users to upload brain MRI scans, receive tumor classification predictions, and visualize AI decision-making through explainability techniques. The application combines a modern React frontend with a Flask and TensorFlow/Keras backend.

---

#  Features

*  Brain MRI tumor classification using a trained hybrid ResNet50 and EfficientNetB0 model
*  Upload MRI images through an intuitive web interface
*  Fast real-time predictions
*  AI explainability visualization
*  Prediction history
*  Fully responsive user interface
*  Modern UI built with React, TypeScript, Vite, and Tailwind CSS

---

#  Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

## Backend

* Python
* Flask
* TensorFlow
* Keras
* OpenCV

---

#  Project Structure

```text
cortex-vision/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── hybrid_resnet50_efficientnetb0.keras
│   └── best_brain_tumor_model.pth
│
├── public/
├── src/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

#  Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/sadhukhanankita2025/CORTEX-VISION.git
cd CORTEX-VISION
```

---

## 2️⃣ Install Frontend Dependencies

```bash
npm install
```

---

## 3️⃣ Start the Frontend

```bash
*npm run dev*
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 4️⃣ Setup the Backend

Use Python 3.11 or newer for the Keras model runtime. On Windows, select the supported interpreter explicitly:

Navigate to the backend directory:

```bash
cd backend
```

Install the required Python packages:

```bash
py -3.12 -m pip install -r requirements.txt
```

Start the Flask server:

```bash
py -3.12 app.py
```

The backend will run at:

```text
http://localhost:5000
```

---

# 🏗️ Build for Production

```bash
npm run build
```

---

# 📦 Backend Requirements

Install all required Python libraries using:

```bash
pip install -r requirements.txt
```

---

# 📸 Model

The backend uses the trained **hybrid ResNet50 + EfficientNetB0 Keras model** stored as:

```text
backend/hybrid_resnet50_efficientnetb0.keras
```

The existing PyTorch model file is retained for reference and is not used for inference.

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
