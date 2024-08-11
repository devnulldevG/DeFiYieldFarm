import { ethers } from 'ethers';

interface UserInput {
  address: string;
  amount: string; // Assuming this is in Ether and not in Wei for user friendliness
  network: 'mainnet' | 'ropsten' | 'rinkeby' | 'kovan' | 'goerli';
}

function isValidEthereumAddress(address: string): boolean {
  return ethers.utils.isAddress(address);
}

function isValidAmount(amount: string): boolean {
  try {
    const amountInEther = ethers.utils.parseEther(amount);
    return amountInEther.gt(0);
  } catch {
    return false; // Returns false if the amount is not a valid number or negative.
  }
}

function isValidNetwork(address: string, network: 'mainnet' | 'ropsten' | 'rinkeby' | 'kovan' | 'goerli'): boolean {
  // Assuming the use of a provider that connects to the specified network
  const provider = ethers.getDefaultProvider(network);
  return provider.resolveName(address).then(() => true).catch(() => false);
  // Note: This is a simplified validation and may require a more complex logic based on your project's need.
}

async function validateUserInput({ address, amount, network }: UserInput): Promise<boolean> {
  // Validates Ethereum address, amount and the network asynchronously
  const isAddressValid = isValidEthereumAddress(address);
  const isAmountValid = isValidAmount(amount);
  const isNetworkValid = await isValidNetwork(address, network);

  return isAddressValid && isAmountValid && isNetworkValid;
}

export { validateUserInput };