"use server"
import { prisma } from "@/lib/db"
import { redis } from "@/lib/redis" 
import { revalidatePath } from "next/cache"
import type { User } from "@/generated/prisma/client"

export async function updateUserRoles(formData: FormData) {
    const data = Object.fromEntries(formData.entries())
    const updates: Promise<User>[] = []

    const page = data.currentPage as string
    const limit = data.currentLimit as string

    for (const [key, value] of Object.entries(data)){

        if(key.startsWith("role_")){
            const userId = key.replace("role_", "")
            const status = value as string

            updates.push(
                prisma.user.update({
                    where: { id: userId },
                    data: {
                        admin: status === "Admin",
                        localBin: status === "Local",
                    },
                })
            )
        }
    }
    try {
        await Promise.all(updates)
        if (page && limit) {
            const MemberPageCacheKey = `all-members-page-${page}-limit-${limit}`
            await redis.del(MemberPageCacheKey)
        }
        revalidatePath("/admin/members")

    } catch (error) {
        console.error("Failed to update user roles:", error)
        throw new Error("Update failed")
    }
}