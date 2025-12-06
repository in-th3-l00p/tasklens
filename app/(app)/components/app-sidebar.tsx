"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/app/(app)/components/nav-documents"
import { NavMain } from "@/app/(app)/components/nav-main"
import { NavSecondary } from "@/app/(app)/components/nav-secondary"
import { NavUser } from "@/app/(app)/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Tasklens Operator",
    email: "you@tasklens.app",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Task marketplace",
      url: "/tasks",
      icon: IconListDetails,
    },
    {
      title: "My work",
      url: "/tasks/my",
      icon: IconCamera,
    },
    {
      title: "Talent network",
      url: "/talent",
      icon: IconUsers,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: IconReport,
    },
    {
      title: "Profile & reputation",
      url: "/profile",
      icon: IconFolder,
    },
  ],
  navSecondary: [
    {
      title: "Workspace settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Help & docs",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Post a new task",
      url: "/tasks/new",
      icon: IconFileDescription,
    },
    {
      name: "Task templates",
      url: "#",
      icon: IconFileAi,
    },
    {
      name: "Payout & reputation guide",
      url: "#",
      icon: IconDatabase,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">tasklens</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
