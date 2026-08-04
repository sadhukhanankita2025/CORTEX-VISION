import os
import sys
import unittest
from PIL import Image

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import app as backend_app


class PreprocessingTests(unittest.TestCase):
    def test_prepare_mri_input_returns_batch_tensor(self):
        image = Image.new('L', (64, 64), color=140)

        tensor = backend_app.prepare_mri_input(image)

        self.assertEqual(tensor.ndim, 4)
        self.assertEqual(tensor.shape[0], 1)
        self.assertEqual(tensor.shape[1], 3)
        self.assertEqual(tensor.shape[2:], (224, 224))
        self.assertTrue(tensor.isfinite().all())


if __name__ == '__main__':
    unittest.main()
