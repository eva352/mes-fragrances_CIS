"use client";

import { DollarSign, TrendingUp, UserPlus, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "@/components/ui/chart";
import { useAuroraChartThemeToken } from "@/lib/echarts/theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const kpis = [
  {
    title: "Utilisateurs",
    value: "1 284",
    delta: "+12,4%",
    icon: Users,
  },
  {
    title: "Nouveaux comptes",
    value: "186",
    delta: "+7,1%",
    icon: UserPlus,
  },
  {
    title: "Conversion",
    value: "3,8%",
    delta: "+0,6%",
    icon: TrendingUp,
  },
  {
    title: "Revenus",
    value: "12 480 €",
    delta: "+4,2%",
    icon: DollarSign,
  },
] as const;

const barData = [
  { month: "Août", signups: 120 },
  { month: "Sep", signups: 186 },
  { month: "Oct", signups: 155 },
  { month: "Nov", signups: 210 },
  { month: "Déc", signups: 278 },
  { month: "Jan", signups: 242 },
];

const areaData = [
  { day: "Lun", visits: 820, orders: 740 },
  { day: "Mar", visits: 910, orders: 810 },
  { day: "Mer", visits: 740, orders: 680 },
  { day: "Jeu", visits: 980, orders: 860 },
  { day: "Ven", visits: 1120, orders: 980 },
  { day: "Sam", visits: 860, orders: 760 },
  { day: "Dim", visits: 690, orders: 640 },
];

const pieData = [
  { category: "support", value: 38 },
  { category: "produit", value: 27 },
  { category: "commercial", value: 21 },
  { category: "autre", value: 14 },
];

const activityRows = [
  {
    id: "AUR-1204",
    event: "Connexion",
    who: "admin@aurora.local",
    status: "OK",
    statusVariant: "secondary" as const,
    at: "Il y a 2 min",
  },
  {
    id: "AUR-1203",
    event: "Création d’utilisateur",
    who: "admin@aurora.local",
    status: "OK",
    statusVariant: "secondary" as const,
    at: "Il y a 12 min",
  },
  {
    id: "AUR-1202",
    event: "Paiement",
    who: "client@example.com",
    status: "En attente",
    statusVariant: "outline" as const,
    at: "Il y a 34 min",
  },
  {
    id: "AUR-1201",
    event: "Export",
    who: "ops@aurora.local",
    status: "Erreur",
    statusVariant: "destructive" as const,
    at: "Il y a 1 h",
  },
] as const;

export function DashboardExample() {
  const theme = useAuroraChartThemeToken();

  const barOption = {
    grid: { top: 16, left: 8, right: 16, bottom: 24, containLabel: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: barData.map((d) => d.month),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: theme.border } },
      axisLabel: { color: theme.mutedForeground },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: theme.border } },
      axisLabel: { color: theme.mutedForeground },
    },
    series: [
      {
        name: "Inscriptions",
        type: "bar",
        data: barData.map((d) => d.signups),
        itemStyle: { borderRadius: [8, 8, 0, 0] },
        barMaxWidth: 32,
      },
    ],
  } as const;

  const pieOption = {
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        name: "Demandes",
        type: "pie",
        radius: ["55%", "80%"],
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        data: pieData.map((d, index) => ({
          name: d.category,
          value: d.value,
          itemStyle: { color: theme.chart[index % theme.chart.length] },
        })),
      },
    ],
  } as const;

  const areaOption = {
    grid: { top: 16, left: 8, right: 16, bottom: 24, containLabel: true },
    tooltip: { trigger: "axis" },
    legend: { bottom: 0 },
    xAxis: {
      type: "category",
      data: areaData.map((d) => d.day),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: theme.border } },
      axisLabel: { color: theme.mutedForeground },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: theme.border } },
      axisLabel: { color: theme.mutedForeground },
    },
    series: [
      {
        name: "Visites",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 2, color: theme.chart[0] },
        areaStyle: { opacity: 0.25, color: theme.chart[0] },
        data: areaData.map((d) => d.visits),
      },
      {
        name: "Commandes",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 2, color: theme.chart[1] ?? theme.chart[0] },
        areaStyle: { opacity: 0.2, color: theme.chart[1] ?? theme.chart[0] },
        data: areaData.map((d) => d.orders),
      },
    ],
  } as const;

  return (
    <div className="w-full space-y-4">
      <Card className="bg-muted/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">Dashboard d’exemple</CardTitle>
          <p className="text-xs text-muted-foreground">
            Ce dashboard sert uniquement à tester les thèmes (couleurs, cartes,
            graphiques, tableaux).
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.title} className="bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{k.title}</CardTitle>
              <k.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-semibold tracking-tight">
                {k.value}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{k.delta}</span>{" "}
                vs période précédente
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Inscriptions (6 mois)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Chart option={barOption} height={260} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Répartition des demandes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Chart option={pieOption} height={260} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trafic & commandes (semaine)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Chart option={areaOption} height={280} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activité récente (fictif)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Événement</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Quand</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityRows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium">{r.event}</TableCell>
                  <TableCell className="text-muted-foreground">{r.who}</TableCell>
                  <TableCell>
                    <Badge variant={r.statusVariant}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {r.at}
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
