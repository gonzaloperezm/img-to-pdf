import express from 'express';
import multer from 'multer';
import { convertImageToPDF } from '../controllers/images.js';


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

router.post('/', upload.single('image'), convertImageToPDF);

export default router;
