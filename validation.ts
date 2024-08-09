import { ethers } from 'ethers';

interface UserInput {
  address: string;
  amount: string; 
}

function isValidEthereumAddress(address: string): boolean {
  return ethers.utils.isAddress(address);
}

function isValidAmount(amount: string): boolean {
  const amountInBigNumber = ethers.BigNumber.from(amount);
  return amountInBigNumber.gt(0);
}

function validateUserInput({ address, amount }: UserInput): boolean {
  return isValidEthereumAddress(address) && isValidAmount(amount);
}

export { validateUserInput };