import base64
import io
import os
import time

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "best_brain_tumor_model.pth")

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "backend": "neurovision-python",
        "model_path": os.path.basename(MODEL_PATH),
        "model_exists": os.path.exists(MODEL_PATH),
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    start_time = time.time()

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded. Use multipart/form-data with field name 'file'."}), 400

    file = request.files["file"]
    try:
        image = Image.open(file.stream).convert("RGB")
    except Exception as exc:
        return jsonify({"error": f"Unable to open image: {exc}"}), 400

    # TODO: Replace this mock inference with a real PyTorch model call.
    image_buffer = io.BytesIO()
    image.save(image_buffer, format="PNG")
    encoded_image = base64.b64encode(image_buffer.getvalue()).decode("utf-8")

    elapsed = time.time() - start_time
    response = {
        "prediction_class": "Glioma",
        "confidence": 92.7,
        "heatmap_url": encoded_image,
        "ai_summary": "The MRI scan shows features consistent with a glioma appearance.",
        "recommendations": [
            "Consult a radiologist for definitive interpretation.",
            "Consider follow-up MRI in 6 weeks."
        ],
        "severity": "Moderate",
        "inference_time_sec": round(elapsed, 3),
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
