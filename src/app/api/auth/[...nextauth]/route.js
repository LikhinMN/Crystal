import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email }
                })

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }
                    })
                    console.log("New user created:", user.email)
                } else {
                    await prisma.user.update({
                        where: { email: user.email },
                        data: {
                            name: user.name,
                            image: user.image,
                        }
                    })
                    console.log("User updated:", user.email)
                }
                return true
            } catch (error) {
                console.error("Error in signIn callback:", error)
                return false
            }
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.picture = user.image
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
                session.user.image = token.picture
            }
            return session
        }
    },
    events: {
        async signIn({ user }) {
            console.log("User signed in:", user.email)
        },
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }