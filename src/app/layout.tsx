import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});

interface RootLayoutProps {
  children: React.ReactNode;
}
 
export default function RootLayout({ children }: RootLayoutProps) {
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
          <header className="p-4 flex justify-end border-b">
            <ModeToggle />
          </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}