"use client";

import * as React from "react";
import {
  Command,
  HelpCircle,
  LayoutGrid,
  LogOut,
  MoreHorizontal,
  Puzzle,
  Settings2,
  PanelsTopLeft,
  Globe,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorModeToggle } from "@/components/color-mode-toggle";
import { Sidebar } from "@/components/ui/sidebar";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth/context";
import { useBuilderPreferences } from "@/lib/builder-preferences";
import { useAppRuntime } from "@/components/app-runtime-context";
import { APP_NAME } from "@/lib/brand";
import { toPublicSiteUrl } from "@/lib/site/public-url";

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Command,
  },
];

const reservedMainPaths = new Set([
  "/",
  "/dashboard",
  "/settings",
  "/aide",
  "/support",
  "/documentation",
  "/profil",
  "/ui/components",
  "/builder/app",
  "/builder/landing",
  "/builder/brief",
  "/site",
  "/site/showroom",
]);

function normalizeLegacyAppPath(path: string) {
  if (path === "/app/dashboard") return "/";
  if (path.startsWith("/app/")) return `/${path.slice("/app/".length)}`;
  return path;
}

function getUserInitials(label: string) {
  const base = label.split("@")[0]?.trim() || "U";
  const parts = base.split(/[^a-zA-Z0-9]+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }

  return base.slice(0, 2).toUpperCase();
}

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { envelope } = useAppRuntime();
  const { prefs } = useBuilderPreferences();

  const userLabel = user?.email ?? "Utilisateur";
  const userInitials = getUserInitials(userLabel);

  const dynamicPages = React.useMemo(() => {
    const pagesByPath = new Map(
      envelope.spec.pages.map((p) => [normalizeLegacyAppPath(p.path), p]),
    );

    const ordered = envelope.spec.shell.navigation
      .map((n) => normalizeLegacyAppPath(n.path))
      .map((path) => pagesByPath.get(path))
      .filter(Boolean);

    const seen = new Set<string>();
    const result = [];

    for (const page of ordered) {
      if (!page) continue;
      const path = normalizeLegacyAppPath(page.path);
      if (seen.has(path)) continue;
      seen.add(path);
      if (page.enabled === false) continue;
      if (reservedMainPaths.has(path)) continue;
      result.push({
        title: page.title,
        url: path,
        icon: PanelsTopLeft,
      });
    }

    for (const page of envelope.spec.pages) {
      const path = normalizeLegacyAppPath(page.path);
      if (seen.has(path)) continue;
      seen.add(path);
      if (page.enabled === false) continue;
      if (reservedMainPaths.has(path)) continue;
      result.push({
        title: page.title,
        url: path,
        icon: PanelsTopLeft,
      });
    }

    return result;
  }, [envelope.spec.pages, envelope.spec.shell.navigation]);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square h-9 w-9 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{APP_NAME}</span>
                  <span className="truncate text-xs text-muted-foreground">SaaS starter</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {[...navMain, ...dynamicPages].map((item) => {
              const Icon = item.icon;
              const active = pathname === item.url;
              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={active}>
                    <Link href={item.url} className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        {prefs.webapp ? (
          <SidebarGroup>
            <SidebarGroupLabel>Webapp</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/builder/app"}>
                  <Link href="/builder/app" className="flex items-center gap-3">
                    <LayoutGrid className="h-4 w-4" />
                    <span>Builder</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/ui/components"}>
                  <Link href="/ui/components" className="flex items-center gap-3">
                    <Puzzle className="h-4 w-4" />
                    <span>Composants</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ) : null}
        {prefs.brief ? (
          <SidebarGroup>
            <SidebarGroupLabel>Projet</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/builder/brief"}>
                  <Link href="/builder/brief" className="flex items-center gap-3">
                    <ClipboardList className="h-4 w-4" />
                    <span>Brief (wizard)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ) : null}
        {prefs.website ? (
          <SidebarGroup>
            <SidebarGroupLabel>Website</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/builder/landing"}
                >
                  <Link
                    href="/builder/landing"
                    className="flex items-center gap-3"
                  >
                    <LayoutGrid className="h-4 w-4" />
                    <span>Builder</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={toPublicSiteUrl("/")}
                    target="_blank"
                    rel="noreferrer"
                    prefetch={false}
                    className="flex items-center gap-3"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Site public</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ) : null}
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup className="space-y-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/aide"}>
                <Link href="/aide" className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4" />
                  <span>Aide</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                <Link href="/settings" className="flex items-center gap-3">
                  <Settings2 className="h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarMenu className="mt-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              size="lg"
              className="h-11 pr-10"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-semibold leading-tight">
                    {userLabel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Connecté
                  </p>
                </div>
              </div>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  aria-label="Menu utilisateur"
                  title="Menu utilisateur"
                  className="text-sidebar-foreground/70 hover:text-sidebar-accent-foreground"
                >
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-48">
                <DropdownMenuLabel className="truncate">
                  {userLabel}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(event) => event.preventDefault()}
                  className="cursor-default"
                >
                  <ColorModeToggle showLabel={false} className="w-full" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profil" className="flex items-center gap-2">
                    <span>Mon profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(event) => {
                    event.preventDefault();
                    logout();
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
