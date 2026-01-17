import { BrowserProvider, Contract, parseEther } from "ethers";

// Mock contract ABI for demo
const ABI = [
  "event Invest(address indexed user, uint256 amount)",
  "event Vote(address indexed user, uint256 proposalId, bool support)",
  "function invest() public payable",
  "function vote(uint256 proposalId, bool support) public",
];

export interface Web3State {
  provider: BrowserProvider | null;
  signer: any | null;
  address: string | null;
  isConnected: boolean;
}

export const connectWallet = async (): Promise<Web3State> => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      const provider = new BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address, isConnected: true };
    } catch (error) {
      console.error("User rejected connection", error);
      return {
        provider: null,
        signer: null,
        address: null,
        isConnected: false,
      };
    }
  } else {
    console.warn("MetaMask not found, running in mock mode");
    // Mock for demo if no wallet
    return {
      provider: null,
      signer: null,
      address: "0xMOCK...USER",
      isConnected: true,
    };
  }
};

export const sendInvestmentTx = async (amount: string, signer: any) => {
  if (!signer)
    return "0xMOCK_TX_HASH_" + Math.random().toString(36).substring(7);
  try {
    // In a real app, you would interact with a deployed contract
    // const contract = new Contract("CONTRACT_ADDRESS", ABI, signer);
    // const tx = await contract.invest({ value: parseEther(amount) });
    // await tx.wait();
    // return tx.hash;

    // Simulating tx for hackathon
    const tx = await signer.sendTransaction({
      to: "0x0000000000000000000000000000000000000000", // Burn address as mock
      value: parseEther(amount),
    });
    return tx.hash;
  } catch (e) {
    console.warn("Investment failed or rejected, using mock hash");
    return "0xMOCK_TX_HASH_" + Math.random().toString(36).substring(7);
  }
};

export const sendVoteTx = async (
  proposalId: number,
  support: boolean,
  signer: any,
) => {
  if (!signer)
    return "0xMOCK_TX_HASH_" + Math.random().toString(36).substring(7);
  try {
    // Mock tx
    const tx = await signer.sendTransaction({
      to: signer.getAddress(), // Send to self as mock
      value: 0,
    });
    return tx.hash;
  } catch {
    return "0xMOCK_TX_HASH_" + Math.random().toString(36).substring(7);
  }
};
