"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Smartphone, LayoutDashboard, Database, ExternalLink } from "lucide-react"

export function RedirectPopover({ isAdmin, isLocal, username, email }: { isAdmin: boolean, isLocal: boolean, username: string, email: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
            <Smartphone className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-0">

        <div className="p-2 border-b bg-muted/30">
          <p className="text-sm">{username}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>

        <div className="flex flex-col">
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="https://tp-cen-srb.github.io/RecycleTP/">
              <ExternalLink className="size-4" />
              Go to Mobile App
            </Link>
          </Button>

          {(isAdmin || isLocal) && (
            <Button asChild variant="ghost" className="justify-start gap-2">
              <Link href="/local/video">
                <Database className="size-4" />
                Local Bin
              </Link>
            </Button>
          )}

          {isAdmin && (
            <Button asChild variant="ghost" className="justify-start gap-2">
              <Link href="/admin">
                <LayoutDashboard className="size-4" />
                Admin Dashboard
              </Link>
            </Button>
          )}
          <div className="p-2"></div>
        </div>
      </PopoverContent>
    </Popover>
  )
}