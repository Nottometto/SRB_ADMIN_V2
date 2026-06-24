import { CreateMemberForm } from "@/components/(auth)/createMember-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LucideSquareArrowRightExit } from "lucide-react"

export default function CreateMember() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="shrink-0 z-40 w-full flex items-center bg-muted p-2">
          <div className="flex-1">
              <h1 className="text-xl">Create Members</h1>
          </div>

          <div className="text-sm flex items-center gap-2">
              <Button type="button" variant="ghost" asChild>
                  <Link href="/admin/members">
                      <LucideSquareArrowRightExit className="size-5"/>
                  </Link>
              </Button>
          </div>
      </header>
      <div className="flex-1 overflow-y-auto bg-dark p-6 md:p-10 flex items-start justify-center">
        <div className="w-full max-w-sm md:max-w-4xl">
          <CreateMemberForm />
        </div>
      </div>

    </div>
  )
}
