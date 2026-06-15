"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export function StatusSelector({ role, name}: { role: string, name: string}) {

  return (
    <Select defaultValue={role} name={name}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select role"/>
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          
          <SelectItem value="Student">Student</SelectItem>
          <SelectItem value="Staff">Staff</SelectItem>
          <SelectItem value="Bin">Bin</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}