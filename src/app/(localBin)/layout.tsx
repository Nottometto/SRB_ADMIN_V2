import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface VideoLayoutProps {
  children: React.ReactNode;
}
 
export default async function VideoLayout({ children }: VideoLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
      <header>
        <Button asChild variant="outline">
            <Link href="/">Home</Link>
        </Button>
      </header>

        {children}
        </ThemeProvider>
      </body>
    </html>
  )
}