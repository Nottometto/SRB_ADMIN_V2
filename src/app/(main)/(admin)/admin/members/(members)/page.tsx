import { getAllMembers, getAllMembersCount } from "@/components/(adminPage)/(members)/get-members"
import MemberComponent from "@/components/(adminPage)/(members)/member";

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
    <MemberComponent startPage={startPage} endPage={endPage} page={page} totalPages={totalPages} limit={limit} memberCount={memberCount} members={members}/>
  )
}