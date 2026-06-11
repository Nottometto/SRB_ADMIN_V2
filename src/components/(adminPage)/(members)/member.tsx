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
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import { Button } from "@/components/ui/button" 

import { MemberSummary } from "./get-members"
import { updateUserRoles } from "@/lib/auth-member"
import { StatusSelector } from "@/components/(adminPage)/(members)/status-selector"

import Link from "next/link"
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
    const [hasChanges, setHasChanges] = useState(false)
    const [isPending, startTransition] = useTransition()

    function handleSubmit(formData: FormData){
        startTransition(async function() {
            await updateUserRoles(formData)
            setHasChanges(false)
        })
    }
    

    return(
    <form action={handleSubmit} onChange={function(){setHasChanges(true)}} className="flex flex-col h-full overflow-hidden">
        <input type="hidden" name="currentPage" value={page} />
        <input type="hidden" name="currentLimit" value={limit} />
        <header className="z-40 w-full flex items-center bg-muted p-2">
            <div className="flex-1">
                <h1 className="text-xl">All Members</h1>
            </div>

            <div className="text-sm flex items-center gap-4">
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
  
                <Button variant="outline" size="icon" disabled={page <= 1}>
                    <Link href={`/admin/members?page=${page - 1}`} className={page <= 1 ? "pointer-events-none opacity-75" : ""}>
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                
                <span className="text-center">
                Page {page} / {totalPages || 1}
                </span>
                    
                <Button variant="outline" size="icon" disabled={page >= totalPages}>
                    <Link href={`/admin/members?page=${page + 1}`} className={page >= totalPages ? "pointer-events-none opacity-75": ""}>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
                    
                </div>
            </div>
        </header>

        <div className="w-full bg-background border-b">
            <Table>
            <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
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
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
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
                        <span className="text-xs text-muted-foreground">WIP</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm"><StatusSelector isAdmin={member.admin} isLocal={member.localBin} name={`role_${member.id}`}/></span>
                    </TableCell>
                    <TableCell className="text-center">
                        <Button variant="ghost" asChild><Link href="#">View More</Link></Button>
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