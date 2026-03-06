"use client"

import * as React from "react"

import Link from "next/link"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavMainItem = {
  title: string
  url: string
  icon?: LucideIcon
}

type DocumentItem = {
  name: string
  url: string
  icon: LucideIcon
}

type SecondaryItem = {
  title: string
  url: string
  icon: LucideIcon
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  brand?: {
    name: React.ReactNode
    href: string
  }
  navMain: NavMainItem[]
  quickCreateHref: string
  quickCreateLabel: string
  documentsHref: string
  documentsLabel: string
  documents: DocumentItem[]
  navSecondary: SecondaryItem[]
  user: {
    name: string
    email: string
    avatar?: string
  }
  onLogout?: () => void
}

export function AppSidebar({
  brand = { name: "Aurora Admin", href: "/admin" },
  navMain,
  quickCreateHref,
  quickCreateLabel,
  documentsHref,
  documentsLabel,
  documents,
  navSecondary,
  user,
  onLogout,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href={brand.href}>
                <Image
                  src="/images/N.png"
                  alt="Nexus"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="text-base font-semibold">{brand.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={navMain}
          quickCreateHref={quickCreateHref}
          quickCreateLabel={quickCreateLabel}
          documentsHref={documentsHref}
          documentsLabel={documentsLabel}
        />
        <NavDocuments items={documents} label={documentsLabel} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
