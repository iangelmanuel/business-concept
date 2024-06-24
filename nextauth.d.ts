import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      email: string
      name: string
      lastname: string
      role: 'admin' | 'user'
      avatar: string | null
      emailVerified?: boolean
      createdAt: Date
      updatedAt: Date
    } & DefaultSession['user']
  }
}
