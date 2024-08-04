import express from 'express';
import { corsMiddelware } from './middleware/cors.js';
import imageRouter from './routes/image.js';

const app = express();
const PORT = process.env.PORT || 4321;

app.use(corsMiddelware());
app.use(express.json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.use('/api/images', imageRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
