import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      lastname: string
      phone: string
      email: string
      role: 'admin' | 'user'
      isConfirmed: boolean
      isUserDeleted: boolean
      createdAt: Date
      updatedAt: Date
    } & DefaultSession['user']
  }
}
