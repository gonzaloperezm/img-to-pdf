import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertImageToPDF = (req, res) => {
  if (!req.file) {
    console.log('No file received.');
    return res.status(400).send({ message: 'Por favor suba una imagen.' });
  }

  const imagePath = req.file.path;
  const pdfPath = path.join(__dirname, '../uploads', `${Date.now()}.pdf`);

  console.log('Generating PDF...');

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(pdfPath);
  
  doc.pipe(writeStream);
  
  doc.image(imagePath, {
    fit: [500, 500],
    align: 'center',
    valign: 'center'
  });
  doc.end();

  writeStream.on('finish', () => {
    console.log('PDF generated successfully.');
    res.download(pdfPath, err => {
      if (err) {
        console.error('Error downloading PDF:', err);
        return res.status(500).send({ message: 'Error al descargar el PDF.' });
      }
      // Cleanup files after download
      fs.unlinkSync(imagePath);
      fs.unlinkSync(pdfPath);
    });
  });

  writeStream.on('error', (err) => {
    console.error('Error generating PDF:', err);
    res.status(500).send({ message: 'Error al generar el PDF.' });
  });
};
