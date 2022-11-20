import { useWeb3React } from "@web3-react/core"
import { Button, List, ListItem, Popover } from "konsta/react"
import { ClientWeb3Connectors } from '../../../lib'
import type Web3 from 'web3'
import { useEffect, useRef, useState } from "react"
export default function Navbar() {
    const walletRef = useRef(null)
    const [walletInfo, setWalletInfo] = useState(false)
    const { activate, deactivate, active, account, library, chainId } = useWeb3React()
    const _connect = async (): Promise<void> => {
        await _change_network()
        await activate(ClientWeb3Connectors.injected).then(() => localStorage.setItem('wallet', '1'))
    }
    const _disconnect = (): void => {
        deactivate()
        localStorage.setItem('wallet', '0')
    }
    const _change_network = async () => {
        //@ts-ignore
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x3e9",
                chainName: "Klaytn Baobab",
                rpcUrls: ["https://api.baobab.klaytn.net:8651/"],
                nativeCurrency: { name: "KLAY", symbol: "KLAY", decimals: 18, },
                blockExplorerUrls: ["https://baobab.scope.klaytn.com/"],
            }]
        })
    }
    //@ts-nocheck
    useEffect(() => {
        if (localStorage.getItem('wallet') === '1') _connect()
    }, [_connect])
    return (
        <nav className='flex w-full py-2 px-4 xl:px-40 xl:py-7'>
            <div className='w-full flex  justify-between'>
                <div className='flex gap-3 items-center'>
                    <img
                        loading='lazy'
                        src='/assets/teamdao/team-logo.png'
                        alt='logo'
                        className='w-40 h-12' />
                </div>
                <div className='flex justify-end items-center'>
                    {active ? (
                        <button
                            ref={walletRef}
                            onClick={() => setWalletInfo(true)}>
                            <Button
                                component="a"
                                tonal
                                className='animate__animated animate__fadeInUp ms-300 k-color-brand-teamdao-primary'>
                                <div className='flex gap-2 items-center -mx-2'>
                                    <img
                                        src='/assets/teamdao/round-team-logo.png'
                                        alt='logo'
                                        className='w-10 h-10 object-cover' />
                                    <span>{`${account?.substring(0, 4)}...${account?.substring(38, 45)}`}</span>
                                </div>
                            </Button>
                        </button>
                    ) : (
                        <Button
                            tonal
                            onClick={_connect}
                            className='animate__animated animate__fadeInUp ms-300 k-color-brand-teamdao-primary'>
                            Connect Wallet
                        </Button>
                    )}
                    <Popover
                        target={walletRef.current}
                        opened={walletInfo && active}
                        onBackdropClick={() => setWalletInfo(false)}>
                        <List nested>
                            <ListItem
                                link
                                onClick={_disconnect}
                                colors={{
                                    primaryTextMaterial: 'text-red-500'
                                }}
                                chevron={false}
                                title="Disconnect Wallet" />
                        </List>
                    </Popover>
                </div>
            </div>
        </nav>
    )
}