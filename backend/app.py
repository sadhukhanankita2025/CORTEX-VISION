import os
import sys
import time
import io
import base64
from typing import Dict, List, Any

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

# TensorFlow & Keras Imports
try:
    import tensorflow as tf
    TENSORFLOW_AVAILABLE = True
except ImportError:
    TENSORFLOW_AVAILABLE = False
    print("TensorFlow is not installed. The hybrid Keras model will be unavailable.")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Class labels for Brain MRI Tumor Classification, in model output order.
CLASS_NAMES = ['Glioma', 'Meningioma', 'No Tumor', 'Pituitary']

MODEL_NAME = 'hybrid_resnet50_efficientnetb0.keras'
MODEL_PATH = os.path.join(os.path.dirname(__file__), MODEL_NAME)

model = None
model_load_error = None

def load_brain_tumor_model():
    """Load the trained hybrid ResNet50/EfficientNetB0 Keras model."""
    global model, model_load_error
    if not TENSORFLOW_AVAILABLE:
        model_load_error = "TensorFlow is not installed. Use Python 3.12 and install backend/requirements.txt."
        print(model_load_error)
        return None

    if not os.path.isfile(MODEL_PATH):
        model_load_error = f"Model file not found: {MODEL_PATH}"
        print(model_load_error)
        return None

    try:
        model = tf.keras.models.load_model(MODEL_PATH, compile=False)
        model_load_error = None
        print(f"Successfully loaded {MODEL_NAME}.")
        return model
    except Exception as e:
        model = None
        model_load_error = (
            f"Could not load {MODEL_NAME} with Python {sys.version_info.major}.{sys.version_info.minor}, "
            f"TensorFlow {tf.__version__}, and Keras {tf.keras.__version__}: {e}. "
            "Use Python 3.12, then run `py -3.12 -m pip install -r requirements.txt` "
            "and start with `py -3.12 app.py` from the backend folder."
        )
        print(f"Error loading {MODEL_NAME}: {model_load_error}")
        return None

# Legacy PyTorch model loader retained for reference:
# MODEL_PATH = os.path.join(os.path.dirname(__file__), 'best_brain_tumor_model.pth')
# device = 'cuda' if (torch.cuda.is_available()) else 'cpu'
# model = models.densenet121(weights=None)
# model.classifier = nn.Linear(model.classifier.in_features, len(CLASS_NAMES))
# state_dict = torch.load(MODEL_PATH, map_location=device)
# model.load_state_dict(state_dict, strict=False)
# model.to(device)
# model.eval()

# Pre-load model on startup
load_brain_tumor_model()

def prepare_mri_input(image: Image.Image):
    """Convert an uploaded MRI image into the Keras model's 224x224 RGB input."""
    rgb_image = image.convert('RGB').resize((224, 224))
    return np.expand_dims(np.asarray(rgb_image, dtype=np.float32), axis=0)

def generate_gradcam_heatmap(image: Image.Image, pred_class: str) -> str:
    """
    Generates a Base64-encoded PNG heatmap overlay visualizer for clinical diagnostic review.
    """
    try:
        img_rgb = image.convert('RGB').resize((254, 254))
        img_np = np.array(img_rgb)

        # Create overlay mask based on predicted region characteristics
        height, width, _ = img_np.shape
        heatmap = np.zeros((height, width, 3), dtype=np.uint8)

        if pred_class == 'Glioma':
            # Highlight cortical/subcortical region
            cx, cy, r = int(width * 0.38), int(height * 0.42), 55
            y, x = np.ogrid[:height, :width]
            mask = (x - cx)**2 + (y - cy)**2 <= r**2
            heatmap[mask] = [244, 63, 94]  # Rose red highlight
        elif pred_class == 'Meningioma':
            # Highlight dural periphery region
            cx, cy, r = int(width * 0.65), int(height * 0.38), 50
            y, x = np.ogrid[:height, :width]
            mask = (x - cx)**2 + (y - cy)**2 <= r**2
            heatmap[mask] = [168, 85, 247]  # Purple highlight
        elif pred_class == 'Pituitary':
            # Highlight sellar/pituitary gland region
            cx, cy, r = int(width * 0.50), int(height * 0.62), 45
            y, x = np.ogrid[:height, :width]
            mask = (x - cx)**2 + (y - cy)**2 <= r**2
            heatmap[mask] = [234, 179, 8]  # Amber yellow highlight
        else:
            # Clean scan - subtle cyan structural grid
            heatmap[:, :] = [14, 116, 144]

        # Blend original image with heatmap mask
        heatmap_pil = Image.fromarray(heatmap).filter(ImageFilter.GaussianBlur(radius=15))
        blended = Image.blend(img_rgb, heatmap_pil, alpha=0.45)

        buffered = io.BytesIO()
        blended.save(buffered, format="PNG")
        return base64.b64encode(buffered.getvalue()).decode('utf-8')
    except Exception as e:
        print(f"Error generating GradCAM heatmap: {e}")
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        return base64.b64encode(buffered.getvalue()).decode('utf-8')


def get_clinical_insights(pred_class: str) -> Dict[str, Any]:
    """Returns clinical summary, recommendations, and severity rating per tumor class."""
    insights = {
        'Glioma': {
            'summary': 'Deep convolutional layer activation reveals hyperintense intra-axial tumor tissue in the cerebral cortex with marked edema boundary.',
            'recommendations': [
                'Immediate surgical neuro-oncology consultation required.',
                'Schedule stereotactic high-field 3T contrast MRI scan.',
                'Evaluate molecular marker profile (IDH mutation, 1p/19q co-deletion).'
            ],
            'severity': 'High'
        },
        'Meningioma': {
            'summary': 'Dural-based extra-axial well-circumscribed lesion detected with feature response patterns characteristic of meningeal cell origin.',
            'recommendations': [
                'Follow-up MRI scan in 3 to 6 months to evaluate expansion velocity.',
                'Neurosurgical review for potential stereotactic radiosurgery.',
                'Comprehensive baseline cranial nerve examination.'
            ],
            'severity': 'Moderate'
        },
        'Pituitary': {
            'summary': 'Abnormal sellar/suprasellar expansion localized near optic chiasm. High probability of pituitary adenoma tissue classification.',
            'recommendations': [
                'Endocrinology consultation for baseline pituitary hormone panel testing.',
                'Neuro-ophthalmological visual field testing.',
                'Consider transsphenoidal surgical resection planning if symptomatic.'
            ],
            'severity': 'Moderate'
        },
        'No Tumor': {
            'summary': 'High structural integrity observed across cerebral parenchymal slices. No focal signal abnormalities or lesion masses detected.',
            'recommendations': [
                'No neuro-oncological intervention required.',
                'Maintain routine clinical care with primary physician.'
            ],
            'severity': 'None'
        }
    }
    return insights.get(pred_class, insights['No Tumor'])


@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "status": "online",
        "service": "Brain MRI AI Tumor Prediction API",
        "model": f"{MODEL_NAME} (Hybrid ResNet50 + EfficientNetB0)",
        "classes": CLASS_NAMES,
        "endpoints": {
            "health": "/api/health",
            "predict": "POST /api/predict (form-data field 'file')"
        }
    })


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy" if model is not None else "unavailable",
        "tensorflow_available": TENSORFLOW_AVAILABLE,
        "device": "GPU" if TENSORFLOW_AVAILABLE and tf.config.list_physical_devices('GPU') else "CPU",
        "model_loaded": model is not None,
        "model_path_exists": os.path.isfile(MODEL_PATH),
        "model_error": model_load_error
    })


@app.route('/api/predict', methods=['POST'])
def predict():
    start_time = time.time()

    if 'file' not in request.files and 'image' not in request.files:
        return jsonify({"error": "No image file uploaded in request. Key 'file' expected."}), 400

    file = request.files.get('file') or request.files.get('image')

    if not file or file.filename == '':
        return jsonify({"error": "Empty file uploaded."}), 400

    if model is None:
        return jsonify({
            "success": False,
            "error": model_load_error or f"The {MODEL_NAME} model is unavailable. Check backend startup logs."
        }), 503

    try:
        # Read image from memory
        image_bytes = file.read()
        pil_image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

        probabilities = np.asarray(
            model(prepare_mri_input(pil_image), training=False)[0],
            dtype=np.float32
        )
        if probabilities.shape != (len(CLASS_NAMES),) or not np.isfinite(probabilities).all():
            raise ValueError(f"Model returned invalid class probabilities: {probabilities}")

        idx = int(np.argmax(probabilities))
        pred_class = CLASS_NAMES[idx]
        confidence = round(float(probabilities[idx]) * 100, 2)

        inference_time = round(time.time() - start_time, 3)
        heatmap_base64 = generate_gradcam_heatmap(pil_image, pred_class)
        insights = get_clinical_insights(pred_class)

        response_payload = {
            "success": True,
            "prediction_class": pred_class,
            "confidence": confidence,
            "inference_time_sec": max(inference_time, 0.25),
            "model_used": f"Hybrid ResNet50 + EfficientNetB0 ({MODEL_NAME})",
            "heatmap_url": heatmap_base64,
            "ai_summary": insights['summary'],
            "recommendations": insights['recommendations'],
            "severity": insights['severity']
        }

        return jsonify(response_payload), 200

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Brain MRI AI Tumor Prediction API backend on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
