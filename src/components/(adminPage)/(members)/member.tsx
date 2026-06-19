"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { ChevronLeft, ChevronRight, Save, X, PlusSquare} from "lucide-react"
import { Button } from "@/components/ui/button" 

import { MemberSummary } from "./get-members"
import { updateUserRoles } from "@/lib/auth-member"
import { StatusSelector } from "@/components/(adminPage)/(members)/status-selector"

import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useState, useTransition } from "react"

export default function MemberComponent({
    startPage, 
    endPage, 
    page, 
    totalPages, 
    limit, 
    memberCount, 
    members
    } : {
    startPage: number, 
    endPage: number, 
    page: number, 
    totalPages: number, 
    limit: number, 
    memberCount: number, 
    members: MemberSummary[]
    } ){

    const router = useRouter();

    const [hasChanges, setHasChanges] = useState(false)
    const [isPending, startTransition] = useTransition()

    const [showConfirm, setShowConfirm] = useState(false)
    const [pendingPage, setPendingPage] = useState<number | null>(null)

    function handleSubmit(formData: FormData){
        startTransition(async function() {
            await updateUserRoles(formData)
            setHasChanges(false)
        })
    }

    function handleNavigation(page: number){
        if (hasChanges) {
            setShowConfirm(true)
            setPendingPage(page)
        }
        else{
            setShowConfirm(false)
            router.push(`/admin/members?page=${page}`)   
        }      
    }

    function confirmDiscard() {
        setHasChanges(false)
        setShowConfirm(false)

        if (pendingPage !== null) {
            router.push(`/admin/members?page=${pendingPage}`)
            setPendingPage(null) 
        }
    }

    function closeAlert() {
        setShowConfirm(false)
        setPendingPage(null)
    }

    return(
    <form action={handleSubmit} onChange={function(){setHasChanges(true)}} className="flex flex-col h-full overflow-hidden">
        <input type="hidden" name="currentPage" value={page} />
        <input type="hidden" name="currentLimit" value={limit} />
        <header className="z-40 w-full flex items-center bg-muted p-2">
            <div className="flex-1">
                <h1 className="text-xl">All Members</h1>
            </div>

            <div className="text-sm flex items-center gap-2">
                {hasChanges && (
                    <Button type="submit" variant="ghost" className="border-bg hover: bg-background/10">
                        <Save className="size-4"/>
                        Save Changes?
                    </Button>
                )}

                <p className="text-muted-foreground">
                    Showing <span className="text-foreground">{startPage} - {endPage}</span> of {memberCount}
                </p>

                <div className="flex items-center gap-2">
  
                <Button type="button" variant="outline" size="icon" disabled={page <= 1} className={page <= 1 ? "pointer-events-none opacity-75" : ""} onClick={() => handleNavigation(page - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-center">
                Page {page} / {totalPages || 1}
                </span>
                    
                <Button type="button" variant="outline" size="icon" disabled={page >= totalPages} className={page >= totalPages ? "pointer-events-none opacity-75": ""} onClick={() => handleNavigation(page + 1)}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                    
                </div>

                <Button type="button" variant="ghost" asChild>
                    <Link href="/admin/members/create">
                        <PlusSquare className="size-5"/>
                    </Link>
                </Button>

            </div>
        </header>

        {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <Alert className="w-full max-w-sm p-6 flex flex-col bg-background shadow-lg">
                    
                    {/* Top Row: Title on the left, X button on the top right */}
                    <div className="flex items-start justify-between">
                        <AlertTitle className="text-left text-lg font-semibold m-0">
                            Unsaved changes
                        </AlertTitle>
                        
                        <Button variant="ghost" size="icon-xs" onClick={closeAlert} className="shrink-0 ml-4">
                            <X className="size-4" />
                        </Button>
                    </div>

                    {/* Content: Description aligned to the left */}
                    <AlertDescription className="text-left text-sm text-muted-foreground mt-3 mb-6">
                        The table contains unsaved changes. Do you want to discard them?
                    </AlertDescription>
                    
                    {/* Bottom Row: Discard button pushed to the bottom right */}
                    <div className="flex justify-end mt-auto">
                        <Button variant="destructive" onClick={confirmDiscard}>
                            Discard changes
                        </Button>
                    </div>
                    
                </Alert>
            </div>
        )}

        <div className="w-full bg-background border-b">
            <Table>
            <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
            </colgroup>
            <TableHeader>
                <TableRow>
                <TableHead className="text-center">s/n</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Email Verified</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">See More</TableHead>
                </TableRow>
            </TableHeader>
            </Table>
        </div>

        <div className="flex-1 overflow-auto">
            <Table>
            <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
            </colgroup>
            <TableBody>
                {members.map(function(member, index) {
                return (
                    <TableRow key={member.id}>
                    <TableCell className="text-center">
                        <span className="text-xs">{index + (limit * (page - 1)) + 1}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-xs">{member.name}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-xs text-muted-foreground">{member.email}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-xs text-muted-foreground">{member.emailVerified === true? "True" : "False"}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-xs text-muted-foreground">{new Date(member.createdAt).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-xs text-muted-foreground">{member.school}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-xs text-muted-foreground">{member.totalPoints}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm"><StatusSelector role={member.role ?? "Student"} name={`role_${member.id}`}/></span>
                    </TableCell>
                    <TableCell className="text-center">
                        <Button variant="ghost" className="border-bg hover: bg-background/10" asChild><Link href={`/admin/members/${member.id}`}>View More</Link></Button>
                    </TableCell>
                    </TableRow>
                )
                })}
            </TableBody>
            </Table>
        </div>
    </form>
    )
}