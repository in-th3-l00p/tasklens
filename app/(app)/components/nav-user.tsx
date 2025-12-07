"use client"

import { SignedIn, UserButton, useUser } from "@clerk/nextjs"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavUser() {
  const { user } = useUser()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SignedIn>
          <div className="flex items-center gap-2">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8 rounded-lg",
                },
              }}
            />
            <div className="hidden min-w-0 flex-1 flex-col text-left text-xs leading-tight md:flex">
              <span className="truncate font-medium">
                {user?.fullName ?? user?.username ?? "Signed in"}
              </span>
              {user?.primaryEmailAddress && (
                <span className="truncate text-[11px] text-muted-foreground">
                  {user.primaryEmailAddress.emailAddress}
                </span>
              )}
            </div>
          </div>
        </SignedIn>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

