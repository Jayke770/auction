import { NextApiRequest, NextApiResponse } from 'next'
interface x extends NextApiRequest {
    body: {
        tokenid: number,
        tokenname: string,
        tokenimage: string
    },
    method: 'POST'
}
type Response = {
    status: boolean,
    title: string,
    message: string
}
export default async function NewAuction(req: x, res: NextApiResponse<Response>) {

}