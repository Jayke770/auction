
import { Button } from "konsta/react"
import moment from "moment"
import { useState, useEffect } from "react"
import Countdown from "react-countdown"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { ClientAuctionLoader } from '../../'
import CountUp from "react-countup"
import Atropos from "atropos/react"
import 'atropos/css'
import { Swal, Web3Contract } from "../../../lib"
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
const card = Array.from({ length: 3 })
interface AuctionData {
    amount: string
    end: string,
    highest_bid_address: string,
    highest_bid_amount: string,
    isDone: boolean,
    start: string,
    tokenid: string
}
interface AuctionInfo {
    status: boolean,
    name: string,
    price: string,
    image: string,
    mmr: string,
    id: string,
    asset: string,
    player: string,
    usdt: string,
    months: string,
    age: string,
    gender: "M" | "F" | "Male" | "Female",
    country: string,
    slp: string,
    earnings: string,
    apy: string,
    asset_value: string,
    address: string
}
interface Bid {
    amount: number
}
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
interface Bidders {
    bidAddr: string,
    bidAmount: string,
    tokenid: string | number
}
export default function AuctionCard({ next, prev, index, length, auction }: {
    next: () => void,
    prev: () => void,
    index: number,
    length: number,
    auction: AuctionData
}) {
    const { activate, deactivate, active, account, library, chainId } = useWeb3React()
    const [auctionData, setAuctionData] = useState<AuctionInfo>()
    const [bidders, setBidders] = useState<Bidders[]>()
    const [bid, setBid] = useState<Bid>()
    const [highest_bid, setHighestBid] = useState<Number>(parseInt(auction.highest_bid_amount))
    const auction_countdown = ({ hours, minutes, seconds, completed }: { hours: any, minutes: any, seconds: any, completed: any }) => {
        return completed ? null : <span className='text-base xl:text-3xl font-bold text-zinc-300'>{hours}h {minutes}m {seconds}s</span>
    }
    const _place_bid = (): void => {
        if (bid?.amount && bid?.amount >= parseInt(Web3.utils.fromWei(highest_bid.toString(), 'ether'))) {
            Swal.fire({
                icon: 'question',
                titleText: 'Place Bid',
                text: "Are you sure you want to proceed?",
                backdrop: true,
                allowOutsideClick: false,
                reverseButtons: true,
                showDenyButton: true,
                denyButtonText: 'Cancel',
                confirmButtonText: 'Place Bid'
            }).then((a) => {
                if (a.isConfirmed) {
                    Swal.fire({
                        icon: 'info',
                        titleText: 'Placing Bid',
                        text: 'Please wait...',
                        backdrop: true,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: async () => {
                            Swal.showLoading(Swal.getConfirmButton())
                            const web3js: Web3 = library
                            //@ts-ignore
                            const contract = new web3js.eth.Contract(Web3Contract.abi, Web3Contract.address)
                            await contract.methods.CreateBid(parseInt(auction.tokenid)).send({ from: account, value: web3js.utils.toWei(bid?.amount.toString(), 'ether') }).then((res: MintResponse) => {
                                Swal.fire({
                                    icon: res.status ? 'success' : 'info',
                                    titleText: 'Transaction Completed',
                                    backdrop: true,
                                    allowOutsideClick: false,
                                }).then(() => {
                                    if (res.status) _get_bidders()
                                })
                            }).catch((e: Error) => {
                                Swal.fire({
                                    icon: 'error',
                                    titleText: 'Transaction Cancelled',
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
    const _get_bidders = async (): Promise<void> => {
        const web3js: Web3 = library
        //@ts-ignore
        const contract = new web3js.eth.Contract(Web3Contract.abi, Web3Contract.address)
        const BIDDERS: Bidders[] = await contract.methods.BiddersData().call()
        let auction_bidders: Bidders[] = []
        BIDDERS.map((x) => {
            if (x.tokenid.toString() === auction.tokenid.toString()) {
                auction_bidders.push({ bidAddr: x.bidAddr, bidAmount: x.bidAmount, tokenid: x.tokenid })
                if (highest_bid < parseInt(x.bidAmount)) {
                    setHighestBid(parseInt(x.bidAmount))
                }
            }
        })
        setBidders(auction_bidders)
    }
    useEffect(() => {
        if (active) _get_bidders()
    }, [active])
    useEffect(() => {
        const get_auction_data = async (): Promise<void> => {
            const req = await fetch(`/api/client/auctions/info?id=${parseInt(auction.tokenid)}`)
            setAuctionData(req.ok ? await req.json() : undefined)
        }
        get_auction_data()
    }, [auction.tokenid, setAuctionData])
    return (
        auctionData ? (
            <div className='animate__animated animate__fadeIn w-full flex flex-col py-5 lg:flex-row lg:justify-between'>
                {/* image */}
                <div className='px-10 w-full flex justify-center items-center  rounded-lg'>
                    <Atropos highlight={false} className="h-54 w-full lg:h-96 lg:w-96 cursor-pointer rounded-lg">
                        <img
                            src={auctionData?.image}
                            alt={auctionData?.name}
                            className='h-full w-full object-contain border-none rounded-lg' />
                    </Atropos>
                </div>
                {/* info */}
                <div className='px-3 xl:px-10 py-3 xl:py-8 flex flex-col w-full mt-10 xl:mt-0'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-3 items-center'>
                            <div className='flex gap-1'>
                                <Button
                                    rounded
                                    className='!w-auto'
                                    small
                                    onClick={prev}
                                    disabled={index === 0}>
                                    <BsArrowLeft />
                                </Button>
                                <Button
                                    rounded
                                    className='prev !w-auto'
                                    small
                                    onClick={next}
                                    disabled={(index + 1) === length}>
                                    <BsArrowRight />
                                </Button>
                            </div>
                            <div className='font-semibold text-zinc-400'>{moment(parseInt(auction.start) * 1000).format('MMMM Do YYYY')} {auction.tokenid}</div>
                        </div>
                        <h1 className='text-4xl lg:text-5xl xl:text-6xl font-black text-zinc-300'>{auctionData?.name || "? ? ?"}</h1>
                    </div>
                    <div className='flex flex-col xl:flex-row gap-2 xl:gap-10 mt-6'>
                        <div className='flex justify-between items-center xl:items-start lg:flex-col gap-1 xl:border-r xl:pr-10 xl:border-zinc-400'>
                            <div className='font-bold text-base xl:text-lg text-zinc-400'>Current Bid</div>
                            <CountUp
                                start={0}
                                end={parseInt(Web3.utils.fromWei(highest_bid.toString(), 'ether'))}
                                suffix=" KLAY"
                                className='text-base xl:text-3xl font-bold text-zinc-300' />
                        </div>
                        <div className='flex justify-between items-center xl:items-start lg:flex-col gap-1'>
                            <div className='font-bold text-base xl:text-lg text-zinc-400'>Auctions ends in</div>
                            <Countdown
                                date={parseInt(moment(parseInt(auction.end) * 1000).format('x'))}
                                renderer={auction_countdown} />
                        </div>
                    </div>
                    <div className='mt-6 flex items-center gap-2'>
                        <input
                            value={bid?.amount}
                            type="number"
                            onInput={(e) => setBid({ ...bid, amount: parseInt(e.currentTarget.value) })}
                            placeholder={`${parseInt(Web3.utils.fromWei(highest_bid.toString(), 'ether'))} KLAY or more`}
                            className={`w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-zinc-800 ${bid?.amount && bid?.amount >= parseInt(Web3.utils.fromWei(highest_bid.toString(), 'ether')) ? 'focus:ring-brand-teamdao-primary/80' : 'focus:ring-red-500/80'} text-xl font-bold text-zinc-300`} />
                        <Button
                            disabled={!(bid?.amount && bid?.amount >= parseInt(Web3.utils.fromWei(highest_bid.toString(), 'ether')))}
                            onClick={_place_bid}
                            className='k-color-brand-teamdao-primary w-40 !font-bold'>Place Bid</Button>
                    </div>
                    <div className='flex flex-col mt-6 gap-2'>
                        {bidders?.map((_, i) => (
                            <div key={i} className='flex justify-between py-2 px-2.5 border-b-[.1px] border-brand-teamdao-primary/20 '>
                                <div className='flex items-center gap-1.5'>
                                    <img
                                        src='/assets/teamdao/round-team-logo.png'
                                        alt='logo'
                                        className='w-10 h-10 object-cover' />
                                    <div className='text-zinc-300 font-bold'>{`${_.bidAddr?.substring(0, 4)}...${_.bidAddr?.substring(38, 45)}`}</div>
                                </div>
                                <div className='flex items-center font-medium '>
                                    {parseInt(Web3.utils.fromWei(_.bidAmount.toString(), 'ether'))} KLAY {_.tokenid}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : <ClientAuctionLoader />
    )
}