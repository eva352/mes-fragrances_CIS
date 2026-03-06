import { BillingOverviewTemplate } from "@/components/app-templates/billing-overview";
import { DashboardAnalyticsTemplate } from "@/components/app-templates/dashboard-analytics";
import { IntegrationsCardsTemplate } from "@/components/app-templates/integrations-cards";
import { JobsRunsTemplate } from "@/components/app-templates/jobs-runs";
import { LogsAuditTemplate } from "@/components/app-templates/logs-audit";
import { NotificationsInboxTemplate } from "@/components/app-templates/notifications-inbox";
import { SettingsGeneralTemplate } from "@/components/app-templates/settings-general";
import { UsersTableTemplate } from "@/components/app-templates/users-table";

export const APP_PAGE_TEMPLATES = [
  { id: "dashboard-analytics", title: "Dashboard (analytics)", Component: DashboardAnalyticsTemplate },
  { id: "users-table", title: "Users (table)", Component: UsersTableTemplate },
  { id: "jobs-runs", title: "Jobs (runs)", Component: JobsRunsTemplate },
  { id: "logs-audit", title: "Logs (audit)", Component: LogsAuditTemplate },
  { id: "integrations-cards", title: "Integrations (cards)", Component: IntegrationsCardsTemplate },
  { id: "billing-overview", title: "Billing (overview)", Component: BillingOverviewTemplate },
  { id: "notifications-inbox", title: "Notifications (inbox)", Component: NotificationsInboxTemplate },
  { id: "settings-general", title: "Settings (general)", Component: SettingsGeneralTemplate },
] as const;

export type AppPageTemplateId = (typeof APP_PAGE_TEMPLATES)[number]["id"];

export function getTemplateById(id: string | null | undefined) {
  if (!id) return null;
  return APP_PAGE_TEMPLATES.find((t) => t.id === id) ?? null;
}

