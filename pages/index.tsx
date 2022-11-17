import { Page, Button } from 'konsta/react'
import Head from 'next/head'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { } from '../lib'
const card = Array.from({ length: 3 })
export default function Home() {
  return (
    <Page>
      <Head>
        <title>TEAMDAO AUCTION</title>
      </Head>
      {/* nav */}
      <nav className='flex w-full py-2 px-4 xl:px-40 xl:py-8'>
        <div className='w-full flex  justify-between'>
          <div className='flex gap-3 items-center'>
            <img
              loading='lazy'
              src='/assets/teamdao/round-team-logo.png'
              alt='logo'
              className='w-12 h-12 block xl:hidden' />
            <img
              loading='lazy'
              src='/assets/teamdao/team-logo.png'
              alt='logo'
              className='w-40 h-12 hidden xl:block' />
            <Button
              outline
              touchRipple={false}
              className='k-color-brand-teamdao-primary'>
              Treasury 88,888
            </Button>
          </div>
          <div className='flex justify-end items-center'>
            <Button tonal className='k-color-brand-teamdao-primary'>
              <div className='flex gap-2 items-center -mx-2'>
                <img
                  src='/assets/teamdao/round-team-logo.png'
                  alt='logo'
                  className='w-10 h-10 object-cover' />
                <span>0x43...3F6E</span>
              </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* hero */}
      <div className='flex px-3 xl:px-40'>
        <div className='w-full flex flex-col xl:flex-row xl:justify-between'>
          {/* image */}
          <div className='px-10 w-full flex justify-center items-center'>
            <img
              loading='lazy'
              src='https://raw.githubusercontent.com/TEAMexchangeAdmin/TEAM-TOKEN-Logo/master/1111.png'
              alt='logo'
              className='max-h-[85vh] w-full object-contain' />
          </div>
          {/* info */}
          <div className='px-10 py-8 flex flex-col w-full'>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-3 items-center'>
                <div className='flex gap-1'>
                  <Button
                    rounded
                    className='!w-auto'
                    small>
                    <BsArrowLeft />
                  </Button>
                  <Button
                    rounded
                    className='!w-auto'
                    small
                    disabled>
                    <BsArrowRight />
                  </Button>
                </div>
                <div className='font-semibold text-zinc-400'>November 19, 2022</div>
              </div>
              <h1 className='text-6xl font-black text-zinc-300'>wPLAYER 1111</h1>
            </div>
            <div className='flex gap-10 mt-6'>
              <div className='flex flex-col gap-1 border-r pr-10 border-zinc-400'>
                <div className='font-bold text-lg text-zinc-400'>Current Bid</div>
                <div className='text-3xl font-bold text-zinc-300'>18.9 KLAY</div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='font-bold text-lg text-zinc-400'>Auctions ends in</div>
                <div className='text-3xl font-bold text-zinc-300'>9h 31m 55s</div>
              </div>
            </div>
            <div className='mt-6 flex items-center gap-2'>
              <input
                placeholder='100 or more'
                className='w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-zinc-800 focus:ring-brand-teamdao-primary/80 text-xl font-bold text-zinc-300' />
              <Button
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
      </div>
    </Page>
  )
}