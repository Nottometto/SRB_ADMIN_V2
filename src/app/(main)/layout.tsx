import "../globals.css";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider"
import { ButtonSessions } from "@/components/(auth)/nav-buttons";
import { Banner } from "@/components/(nav)/banner";
import AdminSidebar from "@/components/(adminPage)/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

interface RootLayoutProps {
  children: React.ReactNode;
}
 
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn("font-sans [scrollbar-gutter:stable]", inter.variable)} suppressHydrationWarning>
      <body>
        <SidebarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <div className="flex-col w-full">
            <header className="sticky top-0 z-50 bg-background p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Banner/>
                <AdminSidebar/>
              </div>

              <nav className="hidden md:flex items-center gap-1">
                <Button variant="ghost" asChild><Link href="/">Home</Link></Button>
                <Button variant="ghost" asChild><Link href="/about">About Us</Link></Button>
                <Button variant="ghost" asChild><Link href="/projects">Projects</Link></Button>
                <Button variant="ghost" asChild><Link href="/contact">Contact</Link></Button>
              </nav>  

              <div className="flex items-center gap-2">
                <ButtonSessions/> 
              </div>
            </header>

            {children}
          </div>
          </ThemeProvider>
        </SidebarProvider>
      </body>
    </html>
  )
}