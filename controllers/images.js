import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertImagesToPDF = (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log('No files received.');
    return res.status(400).send({ message: 'Please upload at least one image.' });
  }

  const pdfPath = path.join(__dirname, '../uploads', `${Date.now()}.pdf`);

  console.log('Generating PDF...');

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(pdfPath);
  
  doc.pipe(writeStream);

  req.files.forEach((file, index) => {
    const imagePath = file.path;
    
    if (index !== 0) {
      doc.addPage();
    }

    doc.image(imagePath, {
      fit: [500, 500],
      align: 'center',
      valign: 'center'
    });
  });

  doc.end();

  writeStream.on('finish', () => {
    console.log('PDF generated successfully.');
    res.download(pdfPath, err => {
      if (err) {
        console.error('Error downloading PDF:', err);
        return res.status(500).send({ message: 'Error downloading PDF.' });
      }
      
      req.files.forEach(file => fs.unlinkSync(file.path));
      fs.unlinkSync(pdfPath); 
    });
  });

  writeStream.on('error', (err) => {
    console.error('Error generating PDF:', err);
    res.status(500).send({ message: 'Error generating PDF.' });
  });
};
