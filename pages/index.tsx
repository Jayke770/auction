import 'swiper/css'
import "swiper/css/navigation"
import React, { useRef } from 'react'
import { Page, Button } from 'konsta/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ClientAuctions } from '../lib'
import { Swiper as SwiperType, Navigation } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import { ClientAuctionCard, ClientAuctionLoader, ClientNavbar } from '../components'
const card = Array.from({ length: 3 })
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
export default function Home() {
  const swiperRef = useRef<SwiperType>()
  const { auctions, auctionssLoading, auctionsError }: { auctions: Auctions, auctionssLoading: boolean, auctionsError: boolean } = ClientAuctions()
  const [auctionsData, setAuctionsData] = useState<Auctions>()
  const next = (): void => swiperRef.current?.slideNext()
  const prev = (): void => swiperRef.current?.slidePrev()
  useEffect(() => setAuctionsData(auctions), [auctions, setAuctionsData])
  return (
    <Page>
      <Head>
        <title>TEAMDAO AUCTION</title>
      </Head>
      {/* nav */}
      <ClientNavbar />
      {/* hero */}
      {auctionsData ? (
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
      }
    </Page >
  )
}