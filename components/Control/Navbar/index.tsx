import { useWeb3React } from "@web3-react/core"
import { NavbarBackLink, Button, Navbar, Popover, List, ListItem } from "konsta/react"
import NextLink from 'next/link'
import { useRef, useState, useEffect } from "react"
import type Web3 from "web3"
import { Web3Connectors } from "../../../lib"
export default function _Navbar() {
    const walletRef = useRef(null)
    const [walletInfo, setWalletInfo] = useState(false)
    const { account, library, activate, active, deactivate } = useWeb3React()
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
    const _connect = async (): Promise<void> => {
        await _change_network()
        await activate(Web3Connectors.injected).then(() => localStorage.setItem('wallet', '1'))
    }
    const _disconnect = (): void => {
        deactivate()
        localStorage.setItem('wallet', '0')
    }
    //@ts-nocheck
    useEffect(() => {
        if (localStorage.getItem('wallet') === '1') _connect()
    }, [])
    return (
        <Navbar
            medium
            translucent
            title="Auction Items"
            left={
                <NextLink href={'/control'}>
                    <NavbarBackLink />
                </NextLink>
            }
            right={
                <>
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
                </>
            } />
    )
}