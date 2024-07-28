import axios from 'axios';
import { config } from 'dotenv';

config();

interface ApiResponse {
  success: boolean;
  data?: any;
}

const fetchDataFromAPI = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(url);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error);
    return { success: false };
  }
};

export const getYieldFarmingData = async (): Promise<ApiResponse> => {
  const apiUrl = process.env.DEFI_PROTOCOL_YIELD_FARMING_API_URL;
  if (!apiUrl) {
    console.error('DEFI_PROTOCOL_YIELD_FARMING_API_URL is not defined in the env file.');
    return { success: false };
  }
  return fetchDataFromAPI(apiUrl);
};

export const getStakingData = async (): Promise<ApiResponse> => {
  const apiUrl = process.env.DEFI_PROTOCOL_STAKING_API_URL;
  if (!apiUrl) {
    console.error('DEFI_PROTOCOL_STAKING_API_URL is not defined in the env file.');
    return { success: false };
  }
  return fetchDataFromAPI(apiUrl);
};