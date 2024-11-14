import type { Metadata } from "next"
import Taskbar from "../components/Taskbar"
import "../styles/globals.css"
import { Providers } from "./providers"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const metadata: Metadata = {
  title: "Artwork4Sale",
  description: "Paintings and more from talented artists.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        <Providers>
          <Taskbar />
          <ToastContainer />
          <main className="m-auto h-[calc(100vh-80px)] min-w-[300px] max-w-full p-4 lg:h-[calc(100vh-96px)]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
