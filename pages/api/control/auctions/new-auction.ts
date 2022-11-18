import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { config } from '../../../../lib'
import dbConnect from '../../../../lib/Db/connect'
import { auction } from '../../../../models'
interface x extends NextApiRequest {
    body: {
        tokenid: number,
        start: string,
        end: string
    },
    method: 'POST'
}
type Response = {
    status: boolean,
    title: string,
    message?: string
} | 'Internal Server Error' | 'Unathorized'
type AuctionDataApi = {
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
export default async function NewAuction(req: x, res: NextApiResponse<Response>) {
    const { method, body: { tokenid, start, end } } = req
    const ADMIN = await getSession({ req })
    try {
        if (ADMIN && method === 'POST') {
            await dbConnect()
            //check if tokenid is not exists in db
            const AUCTION_FOUND = await auction.findOne({ tokenid: tokenid })
            if (AUCTION_FOUND) {
                return res.send({
                    status: false,
                    title: 'Invalid Token ID',
                    message: 'Token ID is already up for bid.'
                })
            }
            //check if the token id is exist in api 
            const AUCTION_FOUND_IN_API: AuctionDataApi = await fetch(`${process.env.NEXT_PUBLIC_API}${tokenid}`).then((res) => res.json())
            if (!AUCTION_FOUND_IN_API.status) {
                return res.send({
                    status: false,
                    title: 'Invalid Token ID',
                    message: 'Token ID is not found.'
                })
            }
            //save new auction 
            const NEW_AUCTION = new auction({
                auctionid: config.id(),
                tokenid: tokenid,
                start: moment(start).format(),
                end: moment(end).format(),
                created: moment().format(),
                createdby: ADMIN.user?.name,
                isSold: false,
                bidders: []
            })
            await NEW_AUCTION.save()
            return res.send({
                status: true,
                title: 'Auction Successfully Saved'
            })
        } else {
            return res.status(401).send('Unathorized')
        }
    } catch (e) {
        return res.status(500).send('Internal Server Error')
    }
}