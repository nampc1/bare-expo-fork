import { useState, useEffect } from 'react'
import { Text, ScrollView } from 'react-native'
import { Worklet } from 'react-native-bare-kit'
import RPC from 'bare-rpc'
import { bundle, COMMANDS, MODULES, WdkModuleMetadata } from '@tetherto/pear-wrk-wdk'
import {
  EVM_ERC_4337_WALLET_MANAGER_CONFIG,
  EVM_WALLET_MANAGER_CONFIG,
  BTC_WALLET_MANAGER_CONFIG,
  SPARK_WALLET_MANAGER_CONFIG,
  TEST_SEED,
  SOLANA_WALLET_MANAGER_CONFIG,
  TRON_WALLET_MANAGER_CONFIG,
  TRON_GASFREE_WALLET_MANAGER_CONFIG,
  TON_WALLET_MANAGER_CONFIG,
  TON_GASLESS_WALLET_MANAGER_CONFIG,
  AAVE_LENDING_EVM_CONFIG
} from './config'

export default function () {
  const [response, setResponse] = useState<string | null>(null)

  useEffect(() => {
    const worklet = new Worklet()

    worklet.start('/worklet.bundle', bundle)

    const { IPC } = worklet

    const rpc = new RPC(IPC, (req) => {
      console.log(req.command)
    })

    const run = async () => {
      const logs: string[] = []
      const appendLog = (title: string, data: any) => {
        const entry = `=== ${title} ===\n${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}`
        console.log(entry)
        logs.push(entry)
        setResponse(logs.join('\n\n'))
      }

      try {
        const pingReq = rpc.request(COMMANDS.PING)
        pingReq.send()
        const pingRes = await pingReq.reply('utf-8')
        appendLog('PING', pingRes)

        const items: WdkModuleMetadata[] = [
          {
            type: 'wallet',
            name: 'ethereum',
            moduleName: MODULES.EVM_ERC_4337,
            network: 'ethereum',
            config: EVM_ERC_4337_WALLET_MANAGER_CONFIG
          },
          {
            type: 'wallet',
            name: 'polygon',
            moduleName: MODULES.EVM,
            network: 'polygon',
            config: EVM_WALLET_MANAGER_CONFIG
          },
          {
            type: 'wallet',
            name: 'bitcoin',
            moduleName: MODULES.BTC,
            network: 'bitcoin',
            config: BTC_WALLET_MANAGER_CONFIG
          },
          {
            type: 'wallet',
            name: 'spark',
            moduleName: MODULES.SPARK,
            network: 'spark',
            config: SPARK_WALLET_MANAGER_CONFIG
          },
          {
            type: 'wallet',
            name: 'solana',
            moduleName: MODULES.SOLANA,
            network: 'solana',
            config: SOLANA_WALLET_MANAGER_CONFIG
          },
          {
            type: 'wallet',
            name: 'tron',
            moduleName: MODULES.TRON,
            network: 'tron',
            config: TRON_WALLET_MANAGER_CONFIG
          },
          {
            type: 'wallet',
            name: 'tron-gasfree',
            moduleName: MODULES.TRON_GASFREE,
            network: 'tron-gasfree',
            config: TRON_GASFREE_WALLET_MANAGER_CONFIG
          },
          {
            type: 'wallet',
            name: 'ton',
            moduleName: MODULES.TON,
            network: 'ton',
            config: TON_WALLET_MANAGER_CONFIG
          },
          {
            type: 'wallet',
            name: 'ton-gasless',
            moduleName: MODULES.TON_GASLESS,
            network: 'ton-gasless',
            config: TON_GASLESS_WALLET_MANAGER_CONFIG
          },
          {
            type: 'protocol',
            name: 'aave',
            moduleName: MODULES.AAVE_EVM,
            network: 'ethereum',
            config: AAVE_LENDING_EVM_CONFIG
          }
        ]

        console.log(TEST_SEED)

        const startReq = rpc.request(COMMANDS.START)
        startReq.send(JSON.stringify({
          seedPhrase: TEST_SEED,
          items
        }))
        const startRes = await startReq.reply('utf-8')
        appendLog('START', JSON.parse(startRes as string))

        const getAddressReq = rpc.request(COMMANDS.GET_ADDRESS)
        getAddressReq.send(JSON.stringify([
          'ethereum',
          'polygon',
          'bitcoin',
          'spark',
          'solana',
          'tron',
          'tron-gasfree',
          'ton',
          'ton-gasless'
        ]))
        const getAddressRes = await getAddressReq.reply('utf-8')
        appendLog('GET_ADDRESS', JSON.parse(getAddressRes as string))

        const quoteReq = rpc.request(COMMANDS.QUOTE_LENDING_SUPPLY)
        quoteReq.send(JSON.stringify([
          { chain: 'ethereum', name: 'aave' },
          { token: '0xdAC17F958D2ee523a2206206994597C13D831ec7', amount: 1000000 }
        ]))
        const quoteRes = await quoteReq.reply('utf-8')
        appendLog('QUOTE_LENDING_SUPPLY', JSON.parse(quoteRes as string))
      } catch (err) {
        console.error(err)
        appendLog('ERROR', err)
      }
    }

    run()
  }, [])

  return <ScrollView><Text>{response}</Text></ScrollView>
}
