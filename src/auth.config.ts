import { prisma } from '@/lib'
import { userLoginSchema } from '@/schema'
import bcrypt from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  callbacks: {
    jwt({ token, user, account, profile, session }) {
      if (user) token.data = user
      return token
    },
    session({ session, token, user }: any) {
      session.user = token.data
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = userLoginSchema.safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        })

        if (!user) return null

        if (!bcrypt.compareSync(password, user.password)) return null

        const { password: _, ...rest } = user

        return rest
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
