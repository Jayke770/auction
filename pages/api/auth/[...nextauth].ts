import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "TEAMDAO Account",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                let result = null
                // @ts-ignore
                const { username, password } = credentials
                //admin 
                console.log(process.env.PSI_USERNAME, process.env.PSI_PASSWORD)
                if (username === process.env.PSI_USERNAME && password === process.env.PSI_PASSWORD) {
                    // name of psi login details should be admin
                    result = { id: 'admin', name: 'admin', image: null }
                }
                return result
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 15 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    callbacks: {
        async session({ session, user, token }) {
            return session
        }
    },
    pages: {
        signIn: '/auth'
    }
})