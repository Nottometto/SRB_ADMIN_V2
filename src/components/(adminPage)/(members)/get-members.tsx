import { prisma } from "@/lib/db"
import { redis } from "@/lib/redis" 
import type { User } from "@/generated/prisma/client"

export type MemberSummary = Pick<User, 'id' | 'name' | 'email' | 'emailVerified' | 'createdAt' | 'admin' | 'localBin'>

export async function getAllMembersCount() {
  const cacheKey = 'all-members-count'
  const cached = await redis.get(cacheKey)

  if (cached) {
    return Number(cached)
  }

  const count = await prisma.user.count()
  await redis.set(cacheKey, count, { ex: 300 })

  return count
}

export async function getAllMembers(page: number, limit: number): Promise<MemberSummary[]>{
  const cacheKey = `all-members-page-${page}-limit-${limit}`
  const cached = await redis.get(cacheKey)

  if (cached) {
    return typeof cached === 'string' ? JSON.parse(cached): cached as MemberSummary[]
  }

  const members = await prisma.user.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      createdAt: true,
      admin: true,
      localBin: true,
    },
  })
  await redis.set(cacheKey, JSON.stringify(members), { ex: 300 })

  return members
}
