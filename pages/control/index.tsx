import { faker } from "@faker-js/faker"
import { Block, Button, Card, Dialog, DialogButton, Link, List, ListInput, ListItem, Navbar, Page, Panel } from "konsta/react"
import Head from "next/head"
import { useState } from "react"
import { FaBars, FaTag, FaPlusCircle, FaUserFriends } from 'react-icons/fa'
import { config } from '../../lib'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import CountUp from 'react-countup'
import NextLink from 'next/link'
const card = Array.from({ length: 10 })
export default function Control() {
    const [navPanel, setNavPanel] = useState(false)
    return (
        <Page>
            <Head>
                <title>Auctions</title>
            </Head>
            {/* navbar */}
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

            {/* navbar panel */}
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
                            title="Add New Auction"
                            link />
                    </List>
                </Page>
            </Panel>
            {/* dashboard */}
            <div className="flex flex-col p-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                    <NextLink href={'/control/auctions'}>
                        <Card
                            className="hover:bg-teal-900/50"
                            margin="m-0"
                            colors={{
                                bgMaterial: 'bg-teal-900/30'
                            }}>
                            <div className="flex">
                                <div className="flex justify-center items-center p-3">
                                    <FaTag
                                        className="text-teal-500"
                                        size={'1.75rem'} />
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col">
                                        <div className="font-normal text-base">Items</div>
                                        <CountUp
                                            start={0}
                                            end={99}
                                            className="font-bold text-xl" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </NextLink>
                    <NextLink href={'/control/bidders'}>
                        <Card
                            margin="m-0"
                            className="hover:bg-amber-900/50"
                            colors={{
                                bgMaterial: 'bg-amber-900/30'
                            }}>
                            <div className="flex">
                                <div className="flex justify-center items-center p-3">
                                    <FaUserFriends
                                        className="text-amber-500"
                                        size={'1.75rem'} />
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col">
                                        <div className="font-normal text-base">Bidders</div>
                                        <CountUp
                                            start={0}
                                            end={99}
                                            className="font-bold text-xl" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </NextLink>
                    <Card
                        className="hover:bg-blue-900/50"
                        margin="m-0"
                        colors={{
                            bgMaterial: 'bg-blue-900/30'
                        }}>
                        <div className="flex">
                            <div className="flex justify-center items-center p-3">
                                <FaUserFriends
                                    className="text-blue-500"
                                    size={'1.75rem'} />
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col">
                                    <div className="font-normal text-base">Income</div>
                                    <CountUp
                                        start={0}
                                        suffix=" KLAY"
                                        end={99}
                                        className="font-bold text-xl" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const ADMIN = await getSession(ctx)
    return ADMIN ? { props: {} } : { props: {}, redirect: { destination: `/api/auth/signin?callbackUrl=${encodeURIComponent('/control')}` } }
}