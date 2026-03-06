"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Typography } from "@/components/ui/typography";

export function BillingOverviewTemplate() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography variant="h2">Billing</Typography>
        <Typography variant="muted">Plan, invoices & usage (UI-only).</Typography>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Plan</CardTitle>
            <Badge variant="secondary">Pro</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">$49 / month</p>
            <Button variant="outline">Manage subscription</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">LLM tokens</span>
              <span className="font-medium">62%</span>
            </div>
            <Progress value={62} />
            <p className="text-xs text-muted-foreground">
              LLM agent will wire real usage metrics.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

