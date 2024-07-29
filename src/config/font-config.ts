import {
  Inter as FontSans,
  Inter, // eslint-disable-next-line camelcase
  Montserrat_Alternates
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
})

export const inter = Inter({ subsets: ["latin"] })

export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "700"]
})
