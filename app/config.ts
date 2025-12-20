// @ts-ignore
import * as env from '@env'

export const TEST_SEED = env.TEST_SEED

export const EVM_WALLET_MANAGER_CONFIG = {
  provider: env.TEST_EVM_PROVIDER,
  transferMaxFee: parseInt(env.TEST_EVM_TRANSFER_MAX_FEE || '0')
}

export const BTC_WALLET_MANAGER_CONFIG = {
  network: env.TEST_BTC_NETWORK,
  host: env.TEST_BTC_HOST,
  port: parseInt(env.TEST_BTC_PORT || '0'),
}

export const TRON_WALLET_MANAGER_CONFIG = {
  provider: env.TEST_TRON_PROVIDER,
}

export const SOLANA_WALLET_MANAGER_CONFIG = {
  rpcUrl: env.TEST_SOLANA_RPC_URL,
  wsUrl: env.TEST_SOLANA_WS_URL,
}

export const SPARK_WALLET_MANAGER_CONFIG = {
  network: env.TEST_SPARK_NETWORK,
}

export const TON_WALLET_MANAGER_CONFIG = {
  tonClient: {
    url: env.TEST_TON_CLIENT_URL,
    secretKey: env.TEST_TON_SECRET_KEY || undefined,
  },
}

export const EVM_ERC_4337_WALLET_MANAGER_CONFIG = {
  chainId: parseInt(env.TEST_ERC4337_CHAIN_ID || '0'),
  provider: env.TEST_ERC4337_PROVIDER,
  bundlerUrl: env.TEST_ERC4337_BUNDLER_URL,
  paymasterUrl: env.TEST_ERC4337_PAYMASTER_URL,
  paymasterAddress: env.TEST_ERC4337_PAYMASTER_ADDRESS,
  entryPointAddress: env.TEST_ERC4337_ENTRY_POINT_ADDRESS,
  safeModulesVersion: env.TEST_ERC4337_SAFE_MODULES_VERSION,
  paymasterToken: {
    address: env.TEST_PAYMASTER_TOKEN_ADDRESS,
  },
  transferMaxFee: parseInt(env.TEST_ERC4337_TRANSFER_MAX_FEE || '0'),
}

export const TON_GASLESS_WALLET_MANAGER_CONFIG = {
  tonClient: {
    url: env.TEST_TON_CLIENT_URL,
    secretKey: env.TEST_TON_SECRET_KEY || undefined,
  },
  tonApiClient: {
    url: env.TEST_TON_API_CLIENT_URL,
    secretKey: env.TEST_TON_API_SECRET_KEY || undefined,
  },
  paymasterToken: {
    address: env.TEST_TON_PAYMASTER_TOKEN_ADDRESS,
  },
  transferMaxFee: parseInt(env.TEST_TON_TRANSFER_MAX_FEE || '0'),
}

export const TRON_GASFREE_WALLET_MANAGER_CONFIG = {
  chainId: env.TEST_TRON_CHAIN_ID,
  provider: env.TEST_TRON_PROVIDER,
  gasFreeProvider: env.TEST_TRON_GASFREE_PROVIDER,
  gasFreeApiKey: env.TEST_TRON_API_KEY,
  gasFreeApiSecret: env.TEST_TRON_API_SECRET,
  serviceProvider: env.TEST_TRON_SERVICE_PROVIDER,
  verifyingContract: env.TEST_TRON_VERIFYING_CONTRACT,
  transferMaxFee: env.TEST_TRANSFER_MAX_FEE,
}
export const AAVE_LENDING_EVM_CONFIG = {
  provider: env.TEST_EVM_PROVIDER,
  transferMaxFee: parseInt(env.TEST_EVM_TRANSFER_MAX_FEE || '0')
}