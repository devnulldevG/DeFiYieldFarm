import axios from 'axios';
import { config } from 'dotenv';

config();

interface ApiFetchResult {
  isSuccess: boolean;
  data?: any;
}

const fetchApiData = async (endpointUrl: string): Promise<ApiFetchResult> => {
  try {
    const response = await axios.get(endpointUrl);
    return { isSuccess: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching data from ${endpointUrl}`, error);
    return { isSuccess: false };
  }
};

export const fetchYieldFarmingInfo = async (): Promise<ApiFetchResult> => {
  const yieldFarmingEndpoint = process.env.YIELD_FARMING_API_ENDPOINT;
  if (!yieldFarmingEndpoint) {
    console.error('YIELD_FARMING_API_ENDPOINT environment variable is not set.');
    return { isSuccess: false };
  }
  return fetchApiData(yieldFarmingEndpoint);
};

export const fetchStakingInfo = async (): Promise<ApiFetchResult> => {
  const stakingApiEndpoint = process.env.STAKING_API_ENDPOINT;
  if (!stakingApiEndpoint) {
    console.error('STAKING_API_ENDPOINT environment variable is not set.');
    return { isSuccess: false };
  }
  return fetchApiData(stakingApiEndpoint);
};