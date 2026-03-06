"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

export function IntegrationsCardsTemplate() {
  const integrations = [
    { name: "Slack", status: "Disconnected" },
    { name: "Stripe", status: "Connected" },
    { name: "Notion", status: "Disconnected" },
    { name: "GitHub", status: "Connected" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography variant="h2">Integrations</Typography>
        <Typography variant="muted">Connecteurs (UI-only).</Typography>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((i) => (
          <Card key={i.name}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{i.name}</CardTitle>
              <Badge variant={i.status === "Connected" ? "secondary" : "outline"}>
                {i.status}
              </Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">Configure via LLM (API keys, OAuth, etc.).</p>
              <Button variant={i.status === "Connected" ? "outline" : "default"}>
                {i.status === "Connected" ? "Manage" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

