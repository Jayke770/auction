import { faker } from "@faker-js/faker"
import { Block, Button, Card, Dialog, DialogButton, Link, List, ListInput, ListItem, Navbar, Page, Panel } from "konsta/react"
import Head from "next/head"
import { useState } from "react"
import { FaBars } from 'react-icons/fa'
import { config } from '../../lib'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
const card = Array.from({ length: 10 })
interface AuctionDialog {
    opened: boolean,
    token?: {
        id: number,
        name: string,
        image: string,
    }
}
export default function Control() {
    const [navPanel, setNavPanel] = useState(false)
    const [auctionDialog, setAuctionDialog] = useState<AuctionDialog>()
    return (
        <Page>
            <Head>
                <title>Auction Control Panel</title>
            </Head>
            <Navbar
                medium
                translucent
                title="Auction Control Panel"
                right={
                    <Link
                        navbar
                        onClick={() => setNavPanel(true)}
                        className="k-color-brand-teamdao-primary">
                        <FaBars size={'1.5rem'} />
                    </Link>
                } />


            <Panel
                opened={navPanel}
                onBackdropClick={() => setNavPanel(false)}
                side="right">
                <Page>
                    <Navbar
                        title="Menu" />
                    <List
                        strong
                        margin="m-0">
                        <ListItem
                            onClick={() => setAuctionDialog({ ...auctionDialog, opened: true })}
                            title="Add New Auction"
                            link />
                    </List>
                </Page>
            </Panel>

            <div className="flex flex-col p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">Recent Actions</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                        {card.map((_, i) => (
                            <Card
                                key={i}
                                margin="m-0"
                                footer={
                                    <div className="flex justify-start">
                                        <Button
                                            rounded
                                            inline
                                            outline
                                            className=" k-color-brand-teamdao-primary">
                                            More info
                                        </Button>
                                    </div>
                                }>
                                <img
                                    alt="k"
                                    className="h-48 w-full object-contain mb-2"
                                    src={config.image(i + 1)} />
                                <div className="text-gray-500 mb-3">Posted on January 21, 2021</div>
                                <p>
                                    Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies
                                    efficitur vitae non felis. Phasellus quis nibh hendrerit...
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Dialog
                title="New Auction"
                onBackdropClick={() => setAuctionDialog({ ...auctionDialog, opened: false })}
                opened={auctionDialog?.opened}
                sizeMaterial="w-[400px]"
                content={
                    <div className="flex flex-col gap-2">
                        <input
                            placeholder="Token ID"
                            className="w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300" />
                        <input
                            placeholder="Token Name"
                            className="w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300" />
                        <input
                            placeholder="Token Image"
                            className="w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300" />
                    </div>
                }
                buttons={
                    <DialogButton
                        className=" k-color-brand-teamdao-primary">
                        Save New Auction
                    </DialogButton>
                } />
        </Page>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const ADMIN = await getSession(ctx)
    return ADMIN ? { props: {} } : { props: {}, redirect: { destination: `/api/auth/signin?callbackUrl=${encodeURIComponent('/control')}` } }
}