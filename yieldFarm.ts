import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

interface YieldRate {
  protocol: string;
  annualYield: number;
}

interface FarmActivity {
  action: "INVEST" | "WITHDRAW";
  amount: BigNumber;
  date: Date;
  protocol: string;
}

class DeFiYieldFarm {
  private provider: ethers.providers.JsonRpcProvider;
  private activityLog: FarmActivity[] = [];

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  }

  async fetchYieldRates(): Promise<YieldRate[]> {
    try {
      const response = await axios.get(process.env.YIELD_RATES_API_URL as string);
      return response.data.rates as YieldRate[];
    } catch (error) {
      console.error("Error fetching yield rates", error);
      return [];
    }
  }

  async investFunds(protocol: string, amount: BigNumber): Promise<void> {
    console.log(`Investing ${amount.toString()} into ${protocol}`);
    this.activityLog.push({
      action: "INVEST",
      amount: amount,
      date: new Date(),
      protocol: protocol
    });
  }

  async withdrawFunds(protocol: string, amount: BigNumber): Promise<void> {
    console.log(`Withdrawing ${amount.toString()} from ${protocol}`);
    this.activityLog.push({
      action: "WITHDRAW",
      amount: amount,
      date: new Date(),
      protocol: protocol
    });
  }

  calculateYield(amount: BigNumber, daysInvested: number, annualYieldRate: number): BigNumber {
    const dailyYieldRate = annualYieldRate / 365;
    const yieldAmount = amount.mul(dailyYieldRate * daysInvested).div(100);
    return yieldAmount;
  }

  logFarmingActivities(): void {
    console.log("Yield Farming Activities:");
    this.activityLog.forEach((activity) => {
      console.log(`${activity.date.toISOString()} - ${activity.action} - ${activity.amount.toString()} - ${activity.protocol}`);
    });
  }
}