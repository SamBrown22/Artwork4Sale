"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemesProvider attribute="data-theme" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </SessionProvider>
  )
}