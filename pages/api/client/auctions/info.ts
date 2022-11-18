import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../lib/Db/connect'
import { auction } from '../../../../models'
type Response = {
    status: boolean,
    title: string,
    message?: string
} | 'Internal Server Error' | 'Unathorized' | any
interface x extends NextApiRequest {
    query: {
        id: string
    },
    method: 'GET'
}
export default async function Auctions(req: x, res: NextApiResponse<Response>) {
    const { method, query: { id } } = req
    try {
        if (method === 'GET') {
            return res.send(await fetch(`${process.env.NEXT_PUBLIC_API}${id}`).then((res) => res.json()))
        } else {
            return res.status(401).send('Unathorized')
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send('Internal Server Error')
    }
}