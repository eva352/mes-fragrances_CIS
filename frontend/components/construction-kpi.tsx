import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ConstructionKpiProps = {
  title: string;
};

export function ConstructionKpi({ title }: ConstructionKpiProps) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="border-dashed bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          En cours de construction.
        </CardContent>
      </Card>
    </div>
  );
}
