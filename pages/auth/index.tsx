import { Block, Button, Card, Dialog, Page, Preloader } from "konsta/react"
import Head from "next/head"
import { useState } from "react"
import { signIn } from 'next-auth/react'
import { Swal } from "../../lib"
import { useRouter } from "next/router"
interface LoginInfo {
    username?: string,
    password?: string,
}
export default function Auth() {
    const router = useRouter()
    const [login, setLoginInfo] = useState<LoginInfo>()
    const _login = (): void => {
        Swal.fire({
            icon: 'info',
            titleText: 'Authenticating',
            text: 'Please wait...',
            backdrop: true,
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: async () => {
                Swal.showLoading(Swal.getConfirmButton())
                await signIn('credentials', { username: login?.username, password: login?.password, redirect: false, callbackUrl: '/control' }).then((req) => {
                    Swal.fire({
                        icon: req?.ok ? 'success' : 'warning',
                        titleText: req?.ok ? 'Redirecting...' : 'Invalid Account',
                        backdrop: true,
                        allowOutsideClick: false,
                        showConfirmButton: !req?.ok,
                        timer: req?.ok ? 500 : 0,
                        willOpen: () => {
                            if (req?.ok) {
                                Swal.showLoading(Swal.getConfirmButton())
                                router.push({ pathname: req?.url })
                            }
                        }
                    })
                })
            }
        })
    }
    return (
        <Page>
            <Head>
                <title>Authentication</title>
            </Head>
            <div className="flex h-screen w-screen justify-center items-center p-4">
                <Card
                    className="w-full md:w-[400px]"
                    margin="m-0"
                    raised
                    contentWrapPadding="p-2"
                    header={
                        <div className="flex justify-center items-center">
                            <img
                                loading='lazy'
                                src='/assets/teamdao/round-team-logo.png'
                                alt='logo'
                                className='w-full object-contain h-48' />
                        </div>
                    }>
                    <div className="flex flex-col gap-4 px-5 py-4">
                        <input
                            value={login?.username}
                            onInput={(e) => setLoginInfo({ ...login, username: e.currentTarget.value })}
                            placeholder="Username"
                            className="w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300" />
                        <input
                            value={login?.password}
                            onKeyUp={(e) => e.key === 'Enter' && _login()}
                            onInput={(e) => setLoginInfo({ ...login, password: e.currentTarget.value })}
                            type={'password'}
                            placeholder="Password"
                            className="w-full p-3 placeholder:text-zinc-500 rounded-lg outline-none transition-all border-none focus:ring-1 bg-md-dark-surface-5 focus:ring-brand-teamdao-primary/80 text-base font-semibold text-zinc-300" />
                        <Button
                            onClick={_login}
                            disabled={!login?.username && !login?.password}
                            className=" k-color-brand-teamdao-primary !text-bold">Login</Button>
                    </div>
                </Card>
            </div>
        </Page>
    )
}