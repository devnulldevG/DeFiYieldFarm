use std::collections::HashMap;
use std::env;

struct YieldFarm {
    id: u32,
    owner: String,
    amount: f64,
    yield_rate: f64, 
}

struct YieldFarmManager {
    farms: HashMap<u32, YieldFarm>,
    next_id: u32,
}

impl YieldFarmManager {
    fn new() -> Self {
        Self {
            farms: HashMap::new(),
            next_id: 1,
        }
    }

    fn invest(&mut self, owner: String, amount: f64, yield_rate: f64) -> u32 {
        let farm_id = self.next_id;
        self.farms.insert(
            farm_id,
            YieldFarm {
                id: farm_id,
                owner,
                amount,
                yield_rate,
            },
        );
        self.next_id += 1;
        farm_id
    }

    fn withdraw(&mut self, farm_id: u32) -> Option<(String, f64)> {
        match self.farms.remove(&farm_id) {
            Some(farm) => Some((farm.owner, farm.amount)),
            None => None,
        }
    }

    fn calculate_yield(&self, farm_id: u32, days: u32) -> Option<f64> {
        match self.farms.get(&farm_id) {
            Some(farm) => {
                let yield_amount = farm.amount * (farm.yield_rate / 100.0) * (days as f64 / 365.0);
                Some(yield_amount)
            }
            None => None,
        }
    }
}

fn main() {
    dotenv::dotenv().ok();

    let mut manager = YieldFarmManager::new();

    let owner = env::var("OWNER").unwrap_or_else(|_| "Alice".to_string());
    let initial_investment = env::var("AMOUNT")
        .unwrap_or("1000".to_string())
        .parse::<f64>()
        .unwrap();
    let yield_rate = env::var("YIELD_RATE")
        .unwrap_or("5".to_string())
        .parse::<f64>()
        .unwrap();

    let farm_id = manager.invest(owner, initial_investment, yield_rate);
    
    if let Some(yield_amount) = manager.calculate_yield(farm_id, 30) { 
        println!("Yield earned in 30 days for farm_id {}: {}", farm_id, yield_amount);
    }

    if let Some((_owner, amount)) = manager.withdraw(farm_id) {
        println!("Withdrew {} from farm_id {}", amount, farm_id);
    }
}