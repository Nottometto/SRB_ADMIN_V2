import Link from "next/link";
import { Button } from "@/components/ui/button"
import { getSignOut } from "@/lib/auth-server";
import { getSession } from "@/lib/auth-server";
import { RedirectPopover } from "@/components/(nav)/redirect-popup"
export async function ButtonSessions(){
    const session = await getSession()
    
    if (!session){
        return(
            <div className="flex items-center gap-2">
                <Button asChild variant="outline">
                    <Link href="/signup">Sign Up</Link>
                </Button>
                <Button asChild >
                    <Link href="/login">Login</Link>
                </Button>
            </div>  
        )
    }
    return(
        <div className="text-sm flex items-center gap-2">
            <form action={getSignOut}>
                <Button type="submit" variant="ghost">
                    Sign Out
                </Button>
            </form>
            <RedirectPopover isAdmin={session.user.admin} isLocal={session.user.localBin} username={session.user.name} email={session.user.email}/>
        </div>

    )

}