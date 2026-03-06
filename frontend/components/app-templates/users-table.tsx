"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";

export function UsersTableTemplate() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Typography variant="h2">Users</Typography>
          <Typography variant="muted">Gestion d’utilisateurs (UI-only).</Typography>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search..." className="w-56" />
          <Button>Invite</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { email: "alice@example.com", role: "Admin", status: "Active" },
                { email: "bob@example.com", role: "Member", status: "Active" },
                { email: "carla@example.com", role: "Member", status: "Invited" },
                { email: "dan@example.com", role: "Viewer", status: "Suspended" },
              ].map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="font-medium">{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        u.status === "Active"
                          ? "secondary"
                          : u.status === "Invited"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
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

