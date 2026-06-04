import "./globals.css";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { ButtonSessions } from "@/components/nav-buttons";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

interface RootLayoutProps {
  children: React.ReactNode;
}
 
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <header className="p-3 flex justify-end border-b gap-2">
            <ButtonSessions/>
            <ModeToggle />
          </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}