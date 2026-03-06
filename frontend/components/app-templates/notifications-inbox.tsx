"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";

type Notice = { title: string; meta: string; unread: boolean };

const notices: Notice[] = [
  { title: "Job failed: cleanup", meta: "2 min ago", unread: true },
  { title: "New member invited", meta: "15 min ago", unread: true },
  { title: "Billing invoice available", meta: "1 day ago", unread: false },
];

function NoticeRow({ n }: { n: Notice }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-border p-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{n.title}</p>
        <p className="text-xs text-muted-foreground">{n.meta}</p>
      </div>
      {n.unread ? <Badge>Unread</Badge> : <Badge variant="outline">Read</Badge>}
    </div>
  );
}

export function NotificationsInboxTemplate() {
  const unread = notices.filter((n) => n.unread);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <Typography variant="h2">Notifications</Typography>
          <Typography variant="muted">Inbox (UI-only).</Typography>
        </div>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4 space-y-3">
              {notices.map((n) => (
                <NoticeRow key={`${n.title}-${n.meta}`} n={n} />
              ))}
            </TabsContent>
            <TabsContent value="unread" className="mt-4 space-y-3">
              {unread.map((n) => (
                <NoticeRow key={`${n.title}-${n.meta}`} n={n} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

