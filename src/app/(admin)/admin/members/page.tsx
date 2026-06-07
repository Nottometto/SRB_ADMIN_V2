import { prisma } from "@/lib/db"
import { redis } from "@/lib/redis" 
import type { User } from "@/generated/prisma/client"

async function getCachedMembers() {
  const cacheKey = 'all-members'

  const cached = await redis.get(cacheKey)

  if (cached){
    return cached as User[]
  }

  const members = await prisma.user.findMany()
  await redis.set(cacheKey, JSON.stringify(members), { ex: 3600 })

  return members
}

export default async function Members() {
  const members = await getCachedMembers()
  return (
    <div>
      <ul className="space-y-2">
        {members.map(function(member) {
          return (
            <li key={member.id} className="border p-2 rounded-md">
              {member.name} - {member.email} - {member.admin}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
