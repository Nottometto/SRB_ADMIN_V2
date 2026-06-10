import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import Link from 'next/link'

export default function AdminDashboard(){
    return(
    <Sidebar>
      <SidebarContent className="pt-16">

        <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin" className="flex items-center gap-3 hover:text-white">
                      Dashboard
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
        <SidebarGroupLabel>Smart Bins</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/bins" className="flex items-center gap-3 hover:text-white">
                      All Bins
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/bins/map" className="flex items-center gap-3 hover:text-white">
                      Map
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/bins/status" className="flex items-center gap-3 hover:text-white">
                      Status
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/bins/analytics" className="flex items-center gap-3 hover:text-white">
                      Analytics
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/bins/create" className="flex items-center gap-3 hover:text-white">
                      Create Bins
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
        <SidebarGroupLabel>Members</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/members" className="flex items-center gap-3 hover:text-white">
                      All Members
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/members/leaderboard" className="flex items-center gap-3 hover:text-white">
                      Leaderboard
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/members/feedback" className="flex items-center gap-3 hover:text-white">
                      Member Feedback
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/members/create" className="flex items-center gap-3 hover:text-white">
                      Create Account
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
        <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/bins/logs" className="flex items-center gap-3 hover:text-white">
                      Bin Logs
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/bins/test" className="flex items-center gap-3 hover:text-white">
                      Bin Test
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/members/bugs" className="flex items-center gap-3 hover:text-white">
                      Bug Reports
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/admin/settings" className="flex items-center gap-3 hover:text-white">
                      Settings
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>  
    )

}
