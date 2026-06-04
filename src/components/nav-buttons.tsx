import Link from "next/link";
import { unstable_noStore } from "next/cache"

import { Button } from "@/components/ui/button"
import { getSignOut } from "@/lib/auth-server";
import { getSession } from "@/lib/auth-server";

export async function ButtonSessions(){
    unstable_noStore()
    const session = await getSession()
    if (!session){
        return(
            <div>
                <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        )
    }
    return(
        <div>
            <p>UserId: {session.user.id}</p>
            <form action={getSignOut}>
                <Button type="submit" variant="secondary">
                    Sign Out
                </Button>
            </form>
        </div>

    )

}