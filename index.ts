import express from 'express';
import { yieldFarm } from './yieldFarm'; 

const app = express();

app.use(express.json());

app.get('/status', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});

app.use('/yieldMiner', yieldFarm);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});