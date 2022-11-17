const config = {
    image: (n: number): string => {
        const x = 1110;
        return `https://raw.githubusercontent.com/TEAMexchangeAdmin/TEAM-TOKEN-Logo/master/${x + n}.png`
    }
}
export default config;