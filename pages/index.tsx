import 'swiper/css'
import "swiper/css/navigation"
import React, { useRef } from 'react'
import { Page, Button } from 'konsta/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ClientAuctions, Web3Contract } from '../lib'
import { Swiper as SwiperType, Navigation } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import { ClientAuctionCard, ClientAuctionLoader, ClientNavbar } from '../components'
import { useWeb3React } from '@web3-react/core'
import type Web3 from 'web3'
const card = Array.from({ length: 3 })
interface Auctions {
  amount: string
  end: string,
  highest_bid_address: string,
  highest_bid_amount: string,
  isDone: boolean,
  start: string,
  tokenid: string
}
export default function Home() {
  const { activate, deactivate, active, account, library, chainId } = useWeb3React()
  const swiperRef = useRef<SwiperType>()
  const [auctionsData, setAuctionsData] = useState<Auctions[]>()
  const next = (): void => swiperRef.current?.slideNext()
  const prev = (): void => swiperRef.current?.slidePrev()
  const get_auctions = async (): Promise<void> => {
    const we3js: Web3 = library
    //@ts-ignore 
    const contract = new we3js.eth.Contract(Web3Contract.abi, Web3Contract.address)
    const AUCTIONS: Auctions[] = await contract.methods.AuctionsData().call()
    const DATA = AUCTIONS.map((x) => {
      return {
        amount: x.amount,
        end: x.end,
        highest_bid_address: x.highest_bid_address,
        highest_bid_amount: x.highest_bid_amount,
        isDone: x.isDone,
        start: x.start,
        tokenid: x.tokenid
      }
    })
    setAuctionsData(DATA)
  }
  useEffect(() => {
    if (active) get_auctions()
  }, [active])
  return (
    <Page>
      <Head>
        <title>TEAMDAO AUCTION</title>
      </Head>
      {/* nav */}
      <ClientNavbar />
      {/* hero */}
      {active ? (
        auctionsData ? (
          auctionsData.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              className='mySwiper flex px-3 xl:px-40 !w-full !h-auto'
              slidesPerView={1}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper
              }}>
              {auctionsData.map((auction, i) => (
                <SwiperSlide key={i} >
                  <ClientAuctionCard
                    next={next}
                    prev={prev}
                    auction={auction}
                    length={auctionsData.length}
                    index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null
        ) : <ClientAuctionLoader />
      ) : (
        <div className='w-full h-[calc(100vh-110px)] px-3 xl:px-40 flex justify-center items-center py-5 xl:py-10'>
          <div className='flex flex-col gap-5 justify-center items-center'>
            <img
              alt='metamask'
              src="/assets/icons/metamask.png"
              className='animate__animated animate__fadeInDown ms-300 h-52 w-full object-contain' />
            <h1 className='animate__animated animate__fadeInUp ms-300  text-xl font-teamdao text-teamdao-primary tracking-[.50rem] break-words'>Connect Your Wallet</h1>
          </div>
        </div>
      )}
    </Page >
  )
}