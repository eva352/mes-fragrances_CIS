"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import type { EChartsCoreOption } from "@/lib/echarts/core";

function kpi(label: string, value: string, meta: string) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{meta}</p>
      </CardContent>
    </Card>
  );
}

export function DashboardAnalyticsTemplate() {
  const option: EChartsCoreOption = {
    grid: { left: 12, right: 12, top: 12, bottom: 24 },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Revenue",
        type: "line",
        smooth: true,
        data: [120, 200, 150, 260, 300, 280, 420],
        areaStyle: {},
      },
    ],
    tooltip: { trigger: "axis" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <Typography variant="h2">Dashboard</Typography>
          <Typography variant="muted">Template UI-only (à relier via LLM).</Typography>
        </div>
        <Badge variant="secondary">demo</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpi("MRR", "$42,000", "+12% vs last week")}
        {kpi("Active users", "1,284", "+3% vs last week")}
        {kpi("Conversion", "4.2%", "-0.4% vs last week")}
        {kpi("Churn", "1.1%", "Stable")}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart option={option} height={320} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent activity</CardTitle>
          <Badge variant="outline">last 24h</Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Signup</TableCell>
                <TableCell>alice@example.com</TableCell>
                <TableCell>New workspace created</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Billing</TableCell>
                <TableCell>bob@example.com</TableCell>
                <TableCell>Upgraded to Pro</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Job</TableCell>
                <TableCell>system</TableCell>
                <TableCell>Nightly sync completed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

