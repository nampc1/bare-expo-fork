import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Worklet } from 'react-native-bare-kit'
import RPC from 'bare-rpc'
import { bundle } from '@tetherto/pear-wrk-wdk'

export default function () {
  const [response, setResponse] = useState<string | null>(null)

  useEffect(() => {
    const worklet = new Worklet()

    worklet.start('/worklet.bundle', bundle)

    const { IPC } = worklet

    console.log('IPC ok', IPC)

    const rpc = new RPC(IPC)

    const networkConfigs : Record<string, any> = {
            ethereum: {
              chainId: 1,
              blockchain: 'ethereum',
              provider: 'https://rpc.mevblocker.io/fast',
              bundlerUrl: 'https://api.candide.dev/public/v3/ethereum',
              paymasterUrl: 'https://api.candide.dev/public/v3/ethereum',
              paymasterAddress: '0x8b1f6cb5d062aa2ce8d581942bbb960420d875ba',
              entryPointAddress: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
              safeModulesVersion: '0.3.0',
              paymasterToken: {
                address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' // USDT
              },
              transferMaxFee: 100000 // 100,000 paymaster token units (e.g., 0.1 USDT if 6 decimals)
            },
            polygon: {
              chainId: 137,
              blockchain: 'polygon',
              provider: 'https://polygon-rpc.com',
              bundlerUrl: 'https://api.candide.dev/public/v3/polygon',
              paymasterUrl: 'https://api.candide.dev/public/v3/polygon',
              paymasterAddress: '0x8b1f6cb5d062aa2ce8d581942bbb960420d875ba',
              entryPointAddress: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
              safeModulesVersion: '0.3.0',
              paymasterToken: {
                address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' // USDT on Polygon
              },
              transferMaxFee: 100000
            },
            arbitrum: {
              chainId: 42161,
              blockchain: 'arbitrum',
              provider: 'https://arb1.arbitrum.io/rpc',
              bundlerUrl: 'https://public.pimlico.io/v2/42161/rpc',
              paymasterUrl: 'https://public.pimlico.io/v2/42161/rpc',
              paymasterAddress: '0x777777777777AeC03fd955926DbF81597e66834C',
              entryPointAddress: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
              safeModulesVersion: '0.3.0',
              paymasterToken: {
                address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9' // USDT on Arbitrum
              },
              transferMaxFee: 100000
            },
            plasma: {
              chainId: 9745,
              blockchain: 'plasma',
              provider: 'https://rpc.plasma.to',
              bundlerUrl: 'https://api.candide.dev/public/v3/9745',
              paymasterUrl: 'https://api.candide.dev/public/v3/9745',
              paymasterAddress: '0x8b1f6cb5d062aa2ce8d581942bbb960420d875ba',
              entryPointAddress: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
              safeModulesVersion: '0.3.0',
              paymasterToken: {
                address: '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb' // USDT
              },
              transferMaxFee: 100000 // 100,000 paymaster token units (e.g., 0.1 USDT if 6 decimals)
            },
            spark: {
              chainId: 0, 
              blockchain: 'spark',
              network: 'MAINNET', // Spark network type (MAINNET, TESTNET)
            }
        }
        
        rpc.request('onWorkletStart', {
          seedPhrase: "ritual snow clever castle stumble copy butter surround elbow dance fancy mansion",
          config: JSON.stringify(networkConfigs),
        }, (err: any, res: any) => {
          if (err) console.error(err)
          else console.log(res)
        })
  }, [])

  return <Text>{response}</Text>
}
