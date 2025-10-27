"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export const Providers = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <SessionProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </SessionProvider>
  )
}
