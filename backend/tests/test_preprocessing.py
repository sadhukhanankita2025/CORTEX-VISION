import os
import sys
import io
import unittest
from PIL import Image
import numpy as np

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import app as backend_app


class PreprocessingTests(unittest.TestCase):
    def test_prepare_mri_input_returns_batch_tensor(self):
        image = Image.new('L', (64, 64), color=140)

        tensor = backend_app.prepare_mri_input(image)

        self.assertEqual(tensor.ndim, 4)
        self.assertEqual(tensor.shape[0], 1)
        self.assertEqual(tensor.shape[1:], (224, 224, 3))
        self.assertEqual(tensor.dtype, np.float32)
        self.assertTrue(np.isfinite(tensor).all())
        self.assertGreaterEqual(tensor.min(), 0)
        self.assertLessEqual(tensor.max(), 255)

    def test_predict_returns_unavailable_when_model_is_not_loaded(self):
        image_buffer = io.BytesIO()
        Image.new('RGB', (32, 32)).save(image_buffer, format='PNG')
        image_buffer.seek(0)

        original_model = backend_app.model
        try:
            backend_app.model = None
            response = backend_app.app.test_client().post(
                '/api/predict',
                data={'file': (image_buffer, 'scan.png')},
                content_type='multipart/form-data'
            )
        finally:
            backend_app.model = original_model

        self.assertEqual(response.status_code, 503)
        self.assertFalse(response.get_json()['success'])


if __name__ == '__main__':
    unittest.main()
