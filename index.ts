import express from 'express';
import { farmingRouter as yieldFarmingRouter } from './yieldFarmRouter';

const server = express();

server.use(express.json());

server.get('/health', (req, res) => {
  res.json({ message: 'Server is up and running!' });
});

server.use('/api/yield-farming', yieldFarmingRouter);

const applicationPort = process.env.PORT || 3000;

server.listen(applicationLinePort, () => {
  console.log(`Yield Farming App Server is active on port ${applicationPort}`);
});