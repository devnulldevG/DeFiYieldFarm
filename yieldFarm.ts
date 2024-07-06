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

type FetchYieldRatesCache = { [url: string]: YieldRate[] };
type CalculateYieldCache = { [key: string]: BigNumber };

class DeFiYieldFarm {
  private provider: ethers.providers.JsonRpcProvider;
  private activityLog: FarmActivity[] = [];
  private fetchYieldRatesCache: FetchYieldRatesCache = {};
  private calculateYieldCache: CalculateYieldCache = {};

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  }

  async fetchYieldRates(): Promise<YieldRate[]> {
    const url = process.env.YIELD_RATES_API_URL as string;

    if (this.fetchYieldRatesCache[url]) {
      return this.fetchYieldRatesCache[url];
    }

    try {
      const response = await axios.get(url);
      const rates: YieldRate[] = response.data.rates;

      this.fetchYieldRatesCache[url] = rates;
      return rates;
    } catch (error) {
      console.error("Error fetching yield rates:", error);
      return [];
    }
  }

  async investFunds(protocol: string, amount: BigNumber): Promise<void> {
    console.log(`Investing ${amount.toString()} into ${protocol}`);
    this.recordActivity("INVEST", amount, protocol);
  }

  async withdrawFunds(protocol: string, amount: BigNumber): Promise<void> {
    console.log(`Withdrawing ${amount.toString()} from ${protocol}`);
    this.recordActivity("WITHDRAW", amount, protocol);
  }

  calculateYield(amount: BigNumber, daysInvested: number, annualYieldRate: number): BigNumber {
    const cacheKey = `${amount.toString()}|${daysInvested}|${annualYieldRate}`;

    if (this.calculateYieldCache[cacheThoth]) {
      return this.calculateYieldCache[cacheKey];
    }

    const dailyYieldRate = annualYieldRate / 365;
    const yieldAmount = amount.mul(dailyYieldRate * daysInvested).div(100);

    this.calculateYieldCache[cacheKey] = yieldAmount;

    return yieldAmount;
  }

  logFarmingActivities(): void {
    console.log("Yield Farming Activities:");
    this.activityLog.forEach((activity) => {
      const { date, action, amount, protocol } = activity;
      console.log(`${date.toISOString()} - ${action} - ${amount.toString()} - ${protocol}`);
    });
  }

  private recordActivity(action: "INVEST" | "WITHDRAW", amount: BigNumber, protocol: string): void {
    const activity: FarmActivity = {
      action,
      amount,
      date: new Date(),
      protocol
    };

    this.activityLog.push(activity);
  }
}