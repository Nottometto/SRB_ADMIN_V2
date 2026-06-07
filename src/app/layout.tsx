import "./globals.css";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { ButtonSessions } from "@/components/nav-buttons";
import { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'
import MenuNavigation from "@/components/shadcn-studio/blocks/menu-navigation";
import { Banner } from "@/components/banner";
import AdminSidebar from "@/components/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const navigationData: NavigationSection[] = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'Projects',
    href: '/projects'
  },
  {
    title: 'About Us',
    href: '/about'
  },
  {
    title: 'Contact',
    href: '/contact'
  }
]

interface RootLayoutProps {
  children: React.ReactNode;
}
 
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn("font-sans [scrollbar-gutter:stable]", inter.variable)} suppressHydrationWarning>
      <head />
      <body>
        <SidebarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <div className="flex flex-col w-full min-h-screen">
            <header className="sticky top-0 z-50 w-full bg-background p-3 flex items-center justify-end border-b gap-2">
              <div className="flex-1 flex justify-start gap-2">
                <Banner/>
                <AdminSidebar/>
              </div>

              <div>
                <MenuNavigation navigationData={navigationData} />
              </div>

              <div className="flex-1 flex justify-end gap-2">
                <ButtonSessions/> 
                <ModeToggle />
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