import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertImageToPDF = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Por favor suba una imagen.' });
  }

  const imagePath = req.file.path;
  const pdfPath = path.join(__dirname, '../uploads', `${Date.now()}.pdf`);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.image(imagePath, {
    fit: [500, 500],
    align: 'center',
    valign: 'center'
  });
  doc.end();

  doc.on('finish', () => {
    res.download(pdfPath, err => {
      if (err) {
        res.status(500).send({ message: 'Error al descargar el PDF.' });
      }
      fs.unlinkSync(imagePath);
      fs.unlinkSync(pdfPath);
    });
  });
};
