import { Schema, model, models, deleteModel } from 'mongoose'
interface Auction {
    auctionid: string,
    tokenid: number,
    start: string,
    end: string,
    created: string,
    createdby: string,
    isSold: boolean,
    bidders: {
        id: string,
        amount: number,
        created: string,
        userid: string
    }[]
}
const AuctionSchema = new Schema<Auction>({
    auctionid: { type: String, required: true },
    tokenid: { type: Number, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    created: { type: String, required: true },
    createdby: { type: String, required: true },
    isSold: { type: Boolean, required: true },
    bidders: [{
        id: String,
        amount: Number,
        created: String,
        userid: String
    }]
})
if (models['Auction'] != null) {
    deleteModel('Auction')
}
const Auction = model<Auction>('Auction', AuctionSchema)
export default Auction