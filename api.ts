import axios from 'axios';
import { config } from 'dotenv';

config();

interface ApiResponse {
  isSuccess: boolean;
  data?: any;  // Renamed from payload to data for more direct understanding of what it contains
}

const fetchDataFromApi = async (apiUrl: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(apiUrl);
    return { isSuccess: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}`, error);
    return { isSuccess: false };
  }
};

export const retrieveYieldFarmingData = async (): Promise<ApiResponse> => {
  const yieldFarmingApiUrl = process.env.DEFI_YIELD_FARMING_API_URL;
  if (!yieldFarmingApiUrl) {
    console.error('DEFI_YIELD_FARMING_API_URL is not defined in the environment variables.');
    return { isSuccess: false };
  }
  return fetchDataFromApi(yieldFarmingApiUrl);
};

export const retrieveStakingData = async (): Promise<ApiResponse> => {
  const stakingApiUrl = process.env.DEFI_STAKING_API_URL;
  if (!stakingApiUrl) {
    console.error('DEFI_STAKING_API_URL is not defined in the environment variables.');
    return { isSuccess: false };
  }
  return fetchDataFromApi(stakingApiUrl);
};