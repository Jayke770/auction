
import { Button } from "konsta/react"
import moment from "moment"
import { useState, useEffect } from "react"
import Countdown from "react-countdown"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { ClientAuctionLoader } from '../../'
import CountUp from "react-countup"
import Atropos from "atropos/react"
import 'atropos/css'
import { Swal } from "../../../lib"
const card = Array.from({ length: 3 })
interface AuctionData {
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
let highest_bid: number = 0
export default function AuctionCard({ next, prev, index, length, auction }: {
    next: () => void,
    prev: () => void,
    index: number,
    length: number,
    auction: AuctionData
}) {
    const [auctionData, setAuctionData] = useState<AuctionInfo>()
    const [bid, setBid] = useState<Bid>()
    const auction_countdown = ({ hours, minutes, seconds, completed }: { hours: any, minutes: any, seconds: any, completed: any }) => {
        return completed ? null : <span className='text-base xl:text-3xl font-bold text-zinc-300'>{hours}h {minutes}m {seconds}s</span>
    }
    const _place_bid = (): void => {
        if (bid?.amount && bid?.amount >= highest_bid) {
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
            })
        }
    }
    useEffect(() => {
        const get_auction_data = async (): Promise<void> => {
            const req = await fetch(`/api/client/auctions/info?id=${auction.tokenid}`)
            setAuctionData(req.ok ? await req.json() : undefined)
        }
        get_auction_data()
    }, [auction.tokenid, setAuctionData])
    useEffect(() => {
        auction.bidders.map((bidder) => {
            if (bidder.amount > highest_bid) {
                highest_bid = bidder.amount
            }
        })
    }, [])
    return (
        auctionData ? (
            <div className='animate__animated animate__fadeIn w-full flex flex-col py-5 lg:flex-row lg:justify-between'>
                {/* image */}
                <div className='px-10 w-full flex justify-center items-center  rounded-lg'>
                    <Atropos highlight={false} className="h-96 w-96 cursor-pointer rounded-lg">
                        <img
                            src={auctionData?.image}
                            alt={auctionData?.name}
                            className='h-full w-full object-cover border-none rounded-lg' />
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
                            <div className='font-semibold text-zinc-400'>{moment(auction.start).format('MMMM Do YYYY')}</div>
                        </div>
                        <h1 className='text-4xl lg:text-5xl xl:text-6xl font-black text-zinc-300'>{auctionData?.name || "? ? ?"}</h1>
                    </div>
                    <div className='flex flex-col xl:flex-row gap-2 xl:gap-10 mt-6'>
                        <div className='flex justify-between items-center xl:items-start lg:flex-col gap-1 xl:border-r xl:pr-10 xl:border-zinc-400'>
                            <div className='font-bold text-base xl:text-lg text-zinc-400'>Current Bid</div>
                            <CountUp
                                start={0}
                                end={highest_bid}
                                suffix=" KLAY"
                                className='text-base xl:text-3xl font-bold text-zinc-300' />
                        </div>
                        <div className='flex justify-between items-center xl:items-start lg:flex-col gap-1'>
                            <div className='font-bold text-base xl:text-lg text-zinc-400'>Auctions ends in</div>
                            <Countdown
                                date={parseInt(moment(auction.start).format('x'))}
                                renderer={auction_countdown} />
                        </div>
                    </div>
                    <div className='mt-6 flex items-center gap-2'>
                        <input
                            value={bid?.amount}
                            type="number"
                            onInput={(e) => setBid({ ...bid, amount: parseInt(e.currentTarget.value) })}
                            placeholder={`${highest_bid} KLAY or more`}
                            className={`w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-zinc-800 ${bid?.amount && bid?.amount >= highest_bid ? 'focus:ring-brand-teamdao-primary/80' : 'focus:ring-red-500/80'} text-xl font-bold text-zinc-300`} />
                        <Button
                            disabled={!(bid?.amount && bid?.amount >= highest_bid)}
                            onClick={_place_bid}
                            className='k-color-brand-teamdao-primary w-40 !font-bold'>Place Bid</Button>
                    </div>
                    <div className='flex flex-col mt-6 gap-2'>
                        {card.map((_, i) => (
                            <div key={i} className='flex justify-between py-2 px-2.5 border-b-[.1px] border-brand-teamdao-primary/20 '>
                                <div className='flex items-center gap-1.5'>
                                    <img
                                        src='/assets/teamdao/round-team-logo.png'
                                        alt='logo'
                                        className='w-10 h-10 object-cover' />
                                    <div className='text-zinc-300 font-bold'>Jhon Doe</div>
                                </div>
                                <div className='flex items-center font-medium '>
                                    100 KLAY
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : <ClientAuctionLoader />
    )
}