import { redis } from "@/lib/redis"

export default async function Home() {
  const count = await redis.get<number>("count")
  return (
    <p>count: {count}</p>
  )
}
