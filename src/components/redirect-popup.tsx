"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Smartphone } from "lucide-react"

export function RedirectPopover({ isAdmin }: { isAdmin: boolean }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
            <Smartphone className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
        <PopoverTitle>Visit our mobile app?</PopoverTitle>
            <Button asChild>
                <Link href="https://tp-cen-srb.github.io/RecycleTP/">Go to Mobile App</Link>
            </Button>
            {isAdmin && (
            <Button asChild variant="outline">
                <Link href="/admin">Admin Dashboard</Link>
            </Button>
            )}
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
