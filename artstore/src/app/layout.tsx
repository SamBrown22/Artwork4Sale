import type { Metadata } from "next"
import Taskbar from "../components/Taskbar"
import "../styles/globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Artwork4Sale",
  description: "Paintings and more from talented artists.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Taskbar />
          <main className="m-auto min-w-[300px] max-w-full p-4">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
