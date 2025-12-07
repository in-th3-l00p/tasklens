"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconCamera,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

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
      title: "Help & docs",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ]
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
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">tasklens</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
