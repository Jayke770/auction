import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12)
const config = {
    id: (size?: number): string => {
        return nanoid(size ? size : 10)
    },
    tokenuri: (n?: number): string => {
        return `${process.env.NEXT_PUBLIC_API}${n}`
    },
    image: (n: number): string => {
        const x = 1110;
        return `https://raw.githubusercontent.com/TEAMexchangeAdmin/TEAM-TOKEN-Logo/master/${x + n}.png`
    }
}
export default config;