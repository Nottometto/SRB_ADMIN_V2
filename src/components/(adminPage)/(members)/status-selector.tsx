"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export function StatusSelector({ isAdmin, isLocal, name}: { isAdmin: boolean, isLocal: boolean, name: string}) {
  const status = isAdmin ? "Admin" : isLocal ? "Local" : "Member";

  return (
    <Select defaultValue={status} name={name}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          
          <SelectItem value="Member">Member</SelectItem>
          <SelectItem value="Local">Local</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}