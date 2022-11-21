import { Button, Card, Fab, List, ListItem, Navbar, NavbarBackLink, Page, Popover, Radio, Popup, Segmented, SegmentedButton } from "konsta/react"
import Head from 'next/head'
import { FaChevronDown, FaRegArrowAltCircleRight } from "react-icons/fa"
import NextLink from 'next/link'
import { config, Swal, Web3Contract } from '../../../lib'
import { ControlNavbar } from '../../../components'
import { useEffect, useState, useRef } from "react"
import { MdAdd } from 'react-icons/md'
//@ts-ignore
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/dark.css"
import moment from "moment"
import { useWeb3React } from '@web3-react/core'
import type Web3 from 'web3'
interface Sort {
    opened?: boolean,
    type?: 'sold' | 'default' | 'not sold'
}
interface Auction {
    opened?: boolean,
    tab: 'info' | 'preview',
    tokenid?: number,
    start?: number,
    end?: number,
    data: {
        status?: boolean,
        name?: string,
        price?: number | string,
        image?: string,
        mmr?: number | string,
        id?: number | string,
        asset?: string,
        player?: string,
        usdt?: string | number,
        months?: string | number,
        age?: string | number,
        gender?: "Male" | "Female" | "M" | "F",
        country?: string,
        slp?: string | number,
        earnings?: string,
        apy?: string,
        asset_value?: string,
        address?: string,
        message?: string
    }
}
type Auctions = {
    auctionid: string,
    tokenid: number,
    start: string,
    end: string,
    created: string,
    createdby: string,
    bidders: {
        id: string,
        amount: number,
        created: string,
        userid: string
    }[]
}[]
interface MintResponse {
    blockHash: string,
    blockNumber: number,
    contractAddress: string,
    cumulativeGasUsed: number,
    effectiveGasPrice: number,
    events: {
        Transfer: {
            address: string,
            blockHash: string,
            blockNumber: number
            event: string,
            id: string
            logIndex: number,
            raw: {
                data: string,
                topics: string[]
            },
            removed: boolean,
            returnValues: {
                0: string,
                1: string,
                2: string,
                from: string,
                to: string,
                tokenId: string,
            },
            signature: string,
            transactionHash: string,
            transactionIndex: 2
        }
    },
    from: string,
    gasUsed: number
    logsBloom: string,
    status: boolean,
    to: string,
    transactionHash: string,
    transactionIndex: number,
    type: string
}
export default function Items() {
    const { account, library, activate, active, deactivate } = useWeb3React()
    const [sort, setSort] = useState<Sort>({
        opened: false,
        type: 'default'
    })
    const [auction, setAuction] = useState<Auction>({
        opened: false,
        tab: 'info',
        tokenid: undefined,
        start: undefined,
        end: undefined,
        data: {}
    })
    const [auctionsData, setAuctionsData] = useState<Auctions>()
    const _save_auction = (): void => {
        if (auction?.end && auction?.start && auction?.tokenid) {
            Swal.fire({
                icon: 'question',
                titleText: 'New Auction',
                text: 'Are you sure you want to save this new auction?',
                backdrop: true,
                allowOutsideClick: false,
                confirmButtonText: 'Save',
                showDenyButton: true,
                denyButtonText: 'Cancel',
                reverseButtons: true
            }).then((a) => {
                if (a.isConfirmed) {
                    Swal.fire({
                        icon: 'info',
                        titleText: 'Saving New Auction',
                        text: 'Please wait...',
                        showConfirmButton: false,
                        backdrop: true,
                        allowOutsideClick: false,
                        willOpen: async (): Promise<void> => {
                            Swal.showLoading(Swal.getConfirmButton())
                            const we3js: Web3 = library
                            //@ts-ignore
                            const contract = new we3js.eth.Contract(Web3Contract.abi, Web3Contract.address)
                            await contract.methods.addAuction(moment(auction?.start).unix(), moment(auction?.end).unix(), auction?.tokenid, config.tokenuri(auction?.tokenid)).send({ from: account }).then((res: MintResponse) => {
                                Swal.fire({
                                    icon: res.status ? 'success' : 'info',
                                    titleText: res.status ? 'Transaction Completed' : 'Transaction Not Completed',
                                    text: res.status ? 'Auction Successfully Saved' : 'Auction Successfully Not Saved',
                                    backdrop: true,
                                    allowOutsideClick: false,
                                }).then(() => {
                                    if (res.status) {
                                        setAuction({
                                            opened: false,
                                            tab: 'info',
                                            tokenid: undefined,
                                            start: undefined,
                                            end: undefined,
                                            data: {}
                                        })
                                    }
                                })
                            }).catch((e: any) => {
                                Swal.fire({
                                    icon: 'error',
                                    titleText: 'Something Went Wrong',
                                    text: e.message,
                                    backdrop: true,
                                    allowOutsideClick: false,
                                })
                            })
                        }
                    })
                }
            })
        }
    }
    const _check = async (): Promise<void> => {
        const start = 1669000128, end = 1669086528
        const we3js: Web3 = library
        //@ts-ignore
        const contract = new we3js.eth.Contract(Web3Contract.abi, Web3Contract.address)
        await contract.methods.addAuction(start, end, 1, config.tokenuri(1112)).send({ from: account })
    }
    return (
        <Page>
            <Head>
                <title>Auction Control Panel</title>
            </Head>
            {/* navbar */}
            <ControlNavbar />
            {/* fab */}
            <Fab
                onClick={() => setAuction({ ...auction, opened: true })}
                icon={<MdAdd />}
                text="New Auction"
                className="fixed right-4-safe bottom-4-safe z-20 k-color-brand-teamdao-primary " />
            {/* items */}
            <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                <div className="col-span-full flex gap-2 justify-between items-center">
                    <input
                        placeholder="Search Item"
                        className="w-full md:w-auto p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300" />
                    <Button
                        onClick={() => setSort({ ...sort, opened: true })}
                        className="sort !w-auto k-color-brand-teamdao-primary">
                        <div className="flex gap-2 items-end justify-center">
                            <span className="font-bold">Sort</span>
                            <FaChevronDown className="mb-0.5" />
                        </div>
                    </Button>
                    <Popover
                        translucent
                        onBackdropClick={() => setSort({ ...sort, opened: false })}
                        opened={sort?.opened}
                        target={'.sort'}>
                        <List nested>
                            <ListItem
                                title="All Items"
                                link
                                chevron={false}
                                onClick={() => setSort({ ...sort, type: 'default', opened: false })}
                                after={
                                    <Radio
                                        className=" k-color-brand-teamdao-primary"
                                        checked={sort?.type === 'default'}
                                        onChange={() => setSort({ ...sort, type: 'default', opened: false })} />
                                } />
                            <ListItem
                                title="Sold"
                                link
                                chevron={false}
                                onClick={() => setSort({ ...sort, type: 'sold', opened: false })}
                                after={
                                    <Radio
                                        className=" k-color-brand-teamdao-primary"
                                        checked={sort?.type === 'sold'}
                                        onChange={() => setSort({ ...sort, type: 'sold', opened: false })} />
                                } />
                            <ListItem
                                title="Not Sold"
                                link
                                chevron={false}
                                onClick={() => setSort({ ...sort, type: 'not sold', opened: false })}
                                after={
                                    <Radio
                                        className=" k-color-brand-teamdao-primary"
                                        checked={sort?.type === 'not sold'}
                                        onChange={() => setSort({ ...sort, type: 'not sold', opened: false })} />
                                } />
                        </List>
                    </Popover>
                </div>
                {active && auctionsData ? (
                    auctionsData.length > 0 ? (
                        auctionsData.map((auction, i) => (
                            <Card
                                key={i}
                                margin="m-0"
                                footer={
                                    <div className="flex justify-start">
                                        <NextLink href={`/control/auctions/${auction.auctionid}`}>
                                            <Button
                                                rounded
                                                inline
                                                outline
                                                className=" k-color-brand-teamdao-primary">
                                                More info
                                            </Button>
                                        </NextLink>
                                    </div>
                                }>
                                <img
                                    alt="k"
                                    className="h-48 w-full object-contain mb-2"
                                    src={config.image(auction.tokenid)} />
                                <div className="text-gray-500 mb-3">Created on {moment(auction.created).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                <p>
                                    Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies
                                    efficitur vitae non felis. Phasellus quis nibh hendrerit...
                                </p>
                            </Card>
                        ))
                    ) : null
                ) : null}
            </div>
            {/* create new auction */}
            <Popup
                opened={auction?.opened}
                onBackdropClick={() => setAuction({ ...auction, opened: false })}
                size="w-screen h-screen md:w-160 md:h-[95vh]">
                <Page>
                    <Navbar
                        left={
                            <NavbarBackLink onClick={() => setAuction({ ...auction, opened: false })} />
                        }
                        title="Create New Auction" />
                    <div className="flex flex-col gap-2.5 p-5 overflow-hidden">
                        <Segmented raised className=" k-color-brand-teamdao-primary">
                            <SegmentedButton
                                active={auction?.tab === 'info'}
                                onClick={() => {
                                    setAuction({ ...auction, tab: 'info', data: {} })
                                }}>
                                Auction Info
                            </SegmentedButton>
                            <SegmentedButton
                                active={auction?.tab === 'preview'}
                                onClick={async () => {
                                    if (auction?.tokenid) {
                                        setAuction({ ...auction, tab: 'preview' })
                                        const url = `${process.env.NEXT_PUBLIC_API}${auction?.tokenid}`
                                        const res = await fetch(url).then((req) => req.json())
                                        console.log('fa', res)
                                        setAuction({ ...auction, data: res, tab: 'preview' })
                                    }
                                }
                                }>
                                Auction Preview
                            </SegmentedButton>
                        </Segmented>
                        {auction?.tab === 'info' ? (
                            <div className="animate__animated animate__fadeInRight ms-300 flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal">Token ID</div>
                                    <input
                                        onInput={(e) => setAuction({ ...auction, tokenid: parseInt(e.currentTarget.value) })}
                                        value={auction?.tokenid}
                                        placeholder="eg. 1111"
                                        type={'number'}
                                        className="w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="font-normal">Auction Start</div>
                                        <Flatpickr
                                            className="w-full cursor-pointer p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300"
                                            data-enable-time
                                            options={{
                                                minDate: new Date(),
                                                defaultHour: 24
                                            }}
                                            placeholder="eg. 2022-11-24 11:02"
                                            onChange={([date]: any[]) => setAuction({ ...auction, start: date })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="font-normal">Auction Ends</div>
                                        <Flatpickr
                                            className="w-full cursor-pointer p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300"
                                            data-enable-time
                                            disabled={!auction?.start}
                                            options={{
                                                minDate: auction?.start
                                            }}
                                            placeholder="eg. 2022-11-24 11:02"
                                            onChange={([date]: any[]) => setAuction({ ...auction, end: date })} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Card
                                className="animate__animated animate__fadeInRight ms-300 "
                                margin="m-0"
                                footer={
                                    <div className="flex justify-start">
                                        <Button
                                            rounded
                                            inline
                                            outline
                                            className=" k-color-brand-teamdao-primary">
                                            More info
                                        </Button>
                                    </div>
                                }>
                                <img
                                    alt=""
                                    className="h-48 w-full object-contain mb-2"
                                    src={auction.data?.image} />
                                <div className="text-gray-500 mb-3">Posted on {moment(auction?.start).format('MMMM Do YYYY, h:mm:ss A')}</div>
                                <p>{auction.data?.player}</p>
                            </Card>
                        )}
                    </div>
                    <div className="animate__animated animate__fadeInUp ms-300 p-5 absolute bottom-0 w-full">
                        <Button
                            disabled={!(auction?.end && auction?.start && auction?.tokenid)}
                            onClick={_save_auction}
                            className=" k-color-brand-teamdao-primary">
                            <span className="font-bold text-base text-black">Save Auction</span>
                        </Button>
                    </div>
                </Page>
            </Popup>
        </Page >
    )
}