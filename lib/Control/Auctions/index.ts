import useSWR from 'swr'
const fetcher = (url: any) => fetch(url).then((res) => res.json())
type data = {
    auctionssLoading: boolean,
    auctionsError: boolean,
    auctions: any
}
export default function Roulettes(id?: any) {
    const { data, error } = useSWR(`/api/control/auctions/${id || 'all'}`, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshWhenHidden: true,
        refreshWhenOffline: true,
        refreshInterval: 20000
    })
    const x: data = {
        auctions: data,
        auctionssLoading: !error && !data,
        auctionsError: error
    }
    return x
}