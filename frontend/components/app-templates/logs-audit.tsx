"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";

export function LogsAuditTemplate() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Typography variant="h2">Logs</Typography>
          <Typography variant="muted">Audit trail (UI-only).</Typography>
        </div>
        <Input placeholder="Search logs..." className="w-64" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { time: "2026-01-11 10:21", actor: "alice@example.com", action: "Updated settings", status: "OK" },
                { time: "2026-01-11 10:05", actor: "system", action: "Nightly sync", status: "OK" },
                { time: "2026-01-11 09:44", actor: "bob@example.com", action: "Exported LLM bundle", status: "WARN" },
              ].map((e) => (
                <TableRow key={`${e.time}-${e.actor}`}>
                  <TableCell className="whitespace-nowrap">{e.time}</TableCell>
                  <TableCell>{e.actor}</TableCell>
                  <TableCell>{e.action}</TableCell>
                  <TableCell>
                    <Badge variant={e.status === "OK" ? "secondary" : "outline"}>{e.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

