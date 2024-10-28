import type { Metadata } from "next"
import localFont from "next/font/local"

import Taskbar from "../components/Taskbar"
import "../styles/globals.css"

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Artwork4Sale",
  description: "Paintings and more from talented artists.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <Taskbar />
        <main className="p-4 max-w-7xl m-auto min-w-[300px]">
          {children}
        </main>
      </body>
    </html>
  )
}
