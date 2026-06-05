import "./globals.css";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { ButtonSessions } from "@/components/nav-buttons";
import Link from "next/link";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

interface RootLayoutProps {
  children: React.ReactNode;
}
 
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" className={cn("font-sans [scrollbar-gutter:stable]", inter.variable)} suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <header className="sticky top-0 z-50 w-full bg-background p-3 flex justify-end border-b gap-2">
            <div className="flex-1">
                {/* You can drop a Logo here later if you want */}
            </div>
            <nav className="flex items-center gap-6 text-sm font-medium">
                {/* Add a subtle visual difference for the current page if you like, e.g., text-foreground vs text-muted-foreground */}
                <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
                  Home
                </Link>
                <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Projects
                </Link>
                <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  About Us
                </Link>
                <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Contact
                </Link>
              </nav>
            <div className="flex-1 flex justify-end gap-2">
              <ButtonSessions/> 
              <ModeToggle />
              
            </div>
          </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}