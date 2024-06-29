import express from 'express';
import { farmingRouter as yieldFarmingRouter } from './yieldFarmRouter';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'Server is up and running!' });
});

app.use('/api/yield-farming', yieldFarmingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Yield Farming App Server is active on port ${PORT}`);
});