import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { AuroraBackground } from "@/components/ui/AuroraBackground"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeZone",
  description: "CodeZone online compiler",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <AuroraBackground>
            <main className="z-10 w-[93vw] h-[90vh] flex items-center">
              {children}
            </main>
          </AuroraBackground>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
