"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";

export function JobsRunsTemplate() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <Typography variant="h2">Jobs</Typography>
          <Typography variant="muted">Runs & status (UI-only).</Typography>
        </div>
        <Button>Run now</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent runs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { job: "sync:crm", started: "10:12", status: "Success", duration: "42s" },
                { job: "sync:billing", started: "09:00", status: "Running", duration: "—" },
                { job: "cleanup", started: "02:10", status: "Failed", duration: "8s" },
              ].map((r) => (
                <TableRow key={`${r.job}-${r.started}`}>
                  <TableCell className="font-medium">{r.job}</TableCell>
                  <TableCell>{r.started}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        r.status === "Success"
                          ? "secondary"
                          : r.status === "Running"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{r.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

