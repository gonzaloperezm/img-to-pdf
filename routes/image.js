import express from 'express';
import multer from 'multer';
import { convertImagesToPDF } from '../controllers/images.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.array('images'), convertImagesToPDF);

export default router;
