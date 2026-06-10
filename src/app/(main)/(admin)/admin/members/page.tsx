import { prisma } from "@/lib/db"
import { redis } from "@/lib/redis" 

import type { User } from "@/generated/prisma/client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button" 
import { ChevronLeft, ChevronRight } from "lucide-react"

import Link from "next/link"
type MemberSummary = Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'admin' | 'localBin'>

async function getAllMembersCount() {
  const cacheKey = 'all-members-count'
  const cached = await redis.get(cacheKey)

  if (cached) {
    return Number(cached)
  }

  const count = await prisma.user.count()
  await redis.set(cacheKey, count, { ex: 300 })

  return count
}

async function getAllMembers(page: number, limit: number): Promise<MemberSummary[]>{
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
      createdAt: true,
      admin: true,
      localBin: true,
    },
  })
  await redis.set(cacheKey, JSON.stringify(members), { ex: 300 })

  return members
}

export default async function Members({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageStr = '1' } = await searchParams;
  const page = Math.max(1, Number(pageStr) || 1)
  const limit = 20
  
  const [memberCount, members] = await Promise.all([
    getAllMembersCount(),
    getAllMembers(page, limit)
  ])

  const totalPages = Math.ceil(memberCount / limit)
  const startPage = (limit) * (page - 1) + 1
  const endPage = startPage + (members.length - 1)

  return (
    <div className="flex flex-col h-full">
      <header className="z-40 w-full flex items-center bg-sidebar-accent p-2">
        <div className="flex-1">
          <h1 className="text-xl">All Members</h1>
        </div>
        
        <div className="text-sm flex items-center gap-4">
          <p className="text-muted-foreground">
            Showing <span className="text-foreground">{startPage} - {endPage}</span> of {memberCount}
          </p>

          <div className="flex items-center gap-2">

            <Link href={`/admin/members?page=${page - 1}`} className={page <= 1 ? "pointer-events-none opacity-75" : ""}>
              <Button variant="outline" size="icon" disabled={page <= 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>

            <span className="text-center">
              Page {page} / {totalPages || 1}
            </span>

            <Link href={`/admin/members?page=${page + 1}`} className={page >= totalPages ? "pointer-events-none opacity-75": ""}>
              <Button variant="outline" size="icon" disabled={page >= totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {members.map(function(member) {
          const dateJoined = new Date(member.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <Card key={member.id}>
              <CardHeader>
                <CardTitle>
                  {member.name} {member.admin ? "Admin" : member.localBin? "Local" : "Member"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <span>{member.email}</span>
                  <span>Joined: {dateJoined}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}