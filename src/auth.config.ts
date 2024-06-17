/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib'
import { loginUserSchema } from '@/schema'
import bcrypt from 'bcrypt'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/regiser'
  },
  callbacks: {
    jwt({ token, user, account, profile, session }) {
      if (user) token.data = user
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session({ session, token, user }: any) {
      session.user = token.data
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const parsedCredentials = loginUserSchema.safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        })

        if (!user) return null

        if (!bcrypt.compareSync(password, user.password)) return null

        const { password: _, id, ...rest } = user

        return { id: id.toString(), ...rest }
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
