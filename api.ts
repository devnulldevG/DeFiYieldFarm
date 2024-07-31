import axios from 'axios';
import { config } from 'dotenv';

config();

interface APIResponse {
  isSuccess: boolean;
  payload?: any;
}

const fetchFromAPI = async (endpointURL: string): Promise<APIResponse> => {
  try {
    const response = await axios.get(endpointURL);
    return { isSuccess: true, payload: response.data };
  } catch (error) {
    console.error(`Error fetching data from ${endpointURL}`, error);
    return { isSuccess: false };
  }
};

export const fetchYieldFarmingInfo = async (): Promise<APIResponse> => {
  const yieldFarmingAPI = process.env.DEFI_YIELD_FARMING_API_URL;
  if (!yieldFarmingAPI) {
    console.error('DEFI_YIELD_FARMING_API_URL is not defined in the env file.');
    return { isSuccess: false };
  }
  return fetchFromAPI(yieldFarmingAPI);
};

export const fetchStakingInfo = async (): Promise<APIResponse> => {
  const stakingAPI = process.env.DEFI_STAKING_API_URL;
  if (!stakingAPI) {
    console.error('DEFI_STAKING_API_URL is not defined in the env file.');
    return { isSuccess: false };
  }
  return fetchFromAPI(stakingAPI);
};