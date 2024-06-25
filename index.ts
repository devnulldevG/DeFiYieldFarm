import express from 'express';
import { yieldFarmRouter } from './yieldFarmRouter';

const app = express();

app.use(express.json());

app.get('/health-check', (req, res) => {
  res.json({ status: 'Server is operational!' });
});

app.use('/yield-farming', yieldFarmRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Yield Farming Server listening on port ${port}...`);
});