import Link from "next/link";
import { Button } from "@/components/ui/button"
import { getSignOut } from "@/lib/auth-server";
import { getSession } from "@/lib/auth-server";
import { RedirectPopover } from "@/components/redirect-popup"
export async function ButtonSessions(){
    const session = await getSession()
    
    if (!session){
        return(
            <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
            <RedirectPopover isAdmin={session.user.admin}/>
            <p>Username: {session.user.name}</p>
            <form action={getSignOut}>
                <Button type="submit" variant="secondary">
                    Sign Out
                </Button>
            </form>
        </div>

    )

}