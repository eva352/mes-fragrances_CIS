"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/ui/typography";

export function SettingsGeneralTemplate() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography variant="h2">Settings</Typography>
        <Typography variant="muted">Préférences (UI-only).</Typography>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspaceName">Name</Label>
              <Input id="workspaceName" defaultValue="Aurora Workspace" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspaceSlug">Slug</Label>
              <Input id="workspaceSlug" defaultValue="aurora-workspace" />
            </div>
            <Button>Save</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
              <div>
                <p className="text-sm font-medium">Email alerts</p>
                <p className="text-xs text-muted-foreground">Receive critical alerts.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
              <div>
                <p className="text-sm font-medium">Product updates</p>
                <p className="text-xs text-muted-foreground">New features and tips.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

