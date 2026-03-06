"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { useAppRuntime } from "@/components/app-runtime-context";
import { getTemplateById } from "@/components/app-templates";

export default function DashboardDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const { envelope } = useAppRuntime();
  const path = `/${params.slug}`;

  const page = envelope.spec.pages.find((p) => p.path === path) ?? null;
  const enabled = page?.enabled ?? true;

  if (!page || !enabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="muted">
            La page `{path}` n’existe pas (ou est désactivée) dans `llm_specs/app.json`.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const template = getTemplateById(page.templateId ?? null);
  if (!template) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{page.title}</CardTitle>
          <Badge variant="outline">no template</Badge>
        </CardHeader>
        <CardContent>
          <Typography variant="muted">
            Aucun templateId configuré pour cette page. Configure `templateId` via `/builder/app`.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const Component = template.Component;
  return <Component />;
}

