import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const card = Array.from({ length: 3 })
export default function AuctionLoader() {
    return (
        <SkeletonTheme
            baseColor="#1b8520"
            highlightColor="#2afe30">
            <div className='w-full flex flex-col py-5 lg:flex-row lg:justify-between'>
                {/* image */}
                <div className='px-10 w-full flex justify-center items-center rounded-lg'>
                    <Skeleton
                        className='h-96 !w-96 !rounded-full'
                        count={1} />
                </div>
                <div className='px-3 xl:px-10 py-3 xl:py-8 flex flex-col w-full mt-10 xl:mt-0'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-3 items-center'>
                            <div className='flex gap-1'>
                                <Skeleton
                                    className='!w-10'
                                    count={1} />
                                <Skeleton
                                    className='!w-10'
                                    count={1} />
                            </div>
                            <Skeleton
                                className='!w-36'
                                count={1} />
                        </div>
                        <Skeleton
                            className='!h-20 !rounded-lg'
                            count={1} />
                    </div>
                    <div className='flex flex-col xl:flex-row gap-2 xl:gap-10 mt-6'>
                        <div className='flex justify-between items-center xl:items-start lg:flex-col gap-1 xl:border-r xl:pr-10 xl:border-zinc-400'>
                            <Skeleton
                                className='!w-10 !rounded-full'
                                count={1} />
                            <Skeleton
                                className='!w-32 !rounded-full'
                                count={1} />
                        </div>
                        <div className='flex justify-between items-center xl:items-start lg:flex-col gap-1'>
                            <Skeleton
                                className='!w-10 !rounded-full'
                                count={1} />
                            <Skeleton
                                className='!w-32 !rounded-full'
                                count={1} />
                        </div>
                    </div>
                    <div className='mt-6 flex items-center gap-2'>
                        <Skeleton
                            className='!w-40 lg:!w-96 h-10 !rounded-lg'
                            count={1} />
                        <Skeleton
                            className='h-10 !w-18 !rounded-lg'
                            count={1} />
                    </div>
                    <div className='flex flex-col mt-6 gap-2'>
                        {card.map((_, i) => (
                            <div key={i} className='flex justify-between py-2 px-2.5 border-b-[.1px] border-brand-teamdao-primary/20 '>
                                <div className='flex items-center gap-1.5'>
                                    <Skeleton
                                        className='h-10 !w-10 !rounded-full'
                                        count={1} />
                                    <Skeleton
                                        className='!w-40'
                                        count={1} />
                                </div>
                                <div className='flex items-center font-medium '>
                                    <Skeleton
                                        className='!w-20'
                                        count={1} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}