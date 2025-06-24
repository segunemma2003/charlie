import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { polygon, polygonMumbai, base, baseSepolia, mainnet, sepolia } from 'wagmi/chains'

// Define chains based on environment
const isDevelopment = import.meta.env.VITE_APP_ENV === 'development' || import.meta.env.DEV

const chains = (isDevelopment
  ? [polygonMumbai, baseSepolia, sepolia]
  : [polygon, base, mainnet]
) as [typeof polygonMumbai | typeof baseSepolia | typeof sepolia, ...(typeof polygonMumbai | typeof baseSepolia | typeof sepolia)[]]


export const wagmiConfig = getDefaultConfig({
  appName: 'Charlie Unicorn AI',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'charlie-unicorn-pnft-battle',
  chains,
  ssr: false, // Since we're building a SPA
})

// Contract addresses - update these with your actual deployed contract addresses
export const CONTRACT_ADDRESSES = {
  // Production addresses (Polygon Mainnet)
  PRODUCTION: {
    PNFT_CARD: import.meta.env.VITE_PNFT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    CHARLIE_POINTS: import.meta.env.VITE_CHARLIE_POINTS_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    BATTLE_ENGINE: import.meta.env.VITE_BATTLE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    MARKETPLACE: import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  },
  // Testnet addresses (Polygon Mumbai)
  TESTNET: {
    PNFT_CARD: import.meta.env.VITE_PNFT_CONTRACT_ADDRESS_TESTNET || '0x0000000000000000000000000000000000000000',
    CHARLIE_POINTS: import.meta.env.VITE_CHARLIE_POINTS_CONTRACT_ADDRESS_TESTNET || '0x0000000000000000000000000000000000000000',
    BATTLE_ENGINE: import.meta.env.VITE_BATTLE_CONTRACT_ADDRESS_TESTNET || '0x0000000000000000000000000000000000000000',
    MARKETPLACE: import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS_TESTNET || '0x0000000000000000000000000000000000000000',
  }
} as const

// Get contracts for current environment
export const getContractAddresses = () => {
  return isDevelopment ? CONTRACT_ADDRESSES.TESTNET : CONTRACT_ADDRESSES.PRODUCTION
}

// Chain configuration with RPC URLs and block explorers
export const SUPPORTED_CHAINS = {
  // Mainnet chains
  polygon: {
    id: 137,
    name: 'Polygon',
    rpcUrl: import.meta.env.VITE_POLYGON_RPC_URL || 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  base: {
    id: 8453,
    name: 'Base',
    rpcUrl: import.meta.env.VITE_BASE_RPC_URL || 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  mainnet: {
    id: 1,
    name: 'Ethereum',
    rpcUrl: import.meta.env.VITE_ETHEREUM_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  
  // Testnet chains
  polygonMumbai: {
    id: 80001,
    name: 'Polygon Mumbai',
    rpcUrl: import.meta.env.VITE_POLYGON_TESTNET_RPC_URL || 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  baseSepolia: {
    id: 84532,
    name: 'Base Sepolia',
    rpcUrl: import.meta.env.VITE_BASE_TESTNET_RPC_URL || 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  sepolia: {
    id: 11155111,
    name: 'Sepolia',
    rpcUrl: import.meta.env.VITE_ETHEREUM_TESTNET_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo',
    blockExplorer: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
} as const

// Get current chain configuration
export const getCurrentChain = () => {
  const currentChainId = isDevelopment ? 80001 : 137 // Mumbai for dev, Polygon for prod
  return Object.values(SUPPORTED_CHAINS).find(chain => chain.id === currentChainId)
}

// Contract ABIs - Add your actual contract ABIs here
export const CONTRACT_ABIS = {
  PNFT_CARD: [
    // ERC-721 standard functions
    'function balanceOf(address owner) view returns (uint256)',
    'function ownerOf(uint256 tokenId) view returns (address)',
    'function tokenURI(uint256 tokenId) view returns (string)',
    'function approve(address to, uint256 tokenId)',
    'function transferFrom(address from, address to, uint256 tokenId)',
    
    // Custom PNFT functions
    'function mint(address to, string memory uri) returns (uint256)',
    'function burn(uint256 tokenId)',
    'function getCardAttributes(uint256 tokenId) view returns (tuple)',
    'function setCardAttributes(uint256 tokenId, tuple attributes)',
  ],
  
  CHARLIE_POINTS: [
    // ERC-20 standard functions
    'function balanceOf(address account) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function transferFrom(address from, address to, uint256 amount) returns (bool)',
    
    // Custom Charlie Points functions
    'function mint(address to, uint256 amount)',
    'function burn(uint256 amount)',
    'function earnPoints(address user, uint256 amount)',
  ],
  
  BATTLE_ENGINE: [
    // Battle functions
    'function createBattle(uint256[] memory cardIds, uint256 wager) returns (uint256)',
    'function joinBattle(uint256 battleId, uint256[] memory cardIds)',
    'function resolveBattle(uint256 battleId, address winner)',
    'function getBattleDetails(uint256 battleId) view returns (tuple)',
    'function claimRewards(uint256 battleId)',
    
    // Moon Pot functions
    'function getMoonPotBalance() view returns (uint256)',
    'function distributeMoonPot(address[] memory winners, uint256[] memory amounts)',
  ],
  
  MARKETPLACE: [
    // Marketplace functions
    'function createListing(uint256 tokenId, uint256 price)',
    'function buyItem(uint256 listingId) payable',
    'function cancelListing(uint256 listingId)',
    'function getListing(uint256 listingId) view returns (tuple)',
    'function getActiveListings() view returns (uint256[])',
  ],
} as const

// Utility functions for contract interactions
export const getContractConfig = (contractName: keyof typeof CONTRACT_ABIS) => {
  const addresses = getContractAddresses()
  return {
    address: addresses[contractName] as `0x${string}`,
    abi: CONTRACT_ABIS[contractName],
  }
}

// Network switching helper
export const switchToSupportedNetwork = async () => {
  const targetChainId = isDevelopment ? 80001 : 137
  
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask, add it
      if (error.code === 4902) {
        const chainConfig = getCurrentChain()
        if (chainConfig) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${chainConfig.id.toString(16)}`,
              chainName: chainConfig.name,
              nativeCurrency: chainConfig.nativeCurrency,
              rpcUrls: [chainConfig.rpcUrl],
              blockExplorerUrls: [chainConfig.blockExplorer],
            }],
          })
        }
      }
    }
  }
}

// Export default config
export default wagmiConfig