# NeuroVision XAI

AI-powered Brain Tumor MRI Classification and Explainability System using React, TypeScript, Vite, Tailwind CSS, Flask, and PyTorch. 
## Technologies Used

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Python
- Flask
- PyTorch
- TorchVision
- OpenCV

---

## Project Structure

```text
neurovision-xai/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── best_brain_tumor_model.pth
│
├── src/
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Frontend Setup

```bash
git clone <repository-url>
cd neurovision-xai

npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt
python app.py
```

Backend runs at:

```
http://localhost:5000
```

---

## Environment Variable

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

---

## Build Frontend

```bash
npm run build
```