import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AidePage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Aide, documentation, support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Point d’entrée unique (MVP). Les pages dédiées peuvent venir plus tard.</p>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link href="/aide">Aide</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/documentation">Documentation</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/support">Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Analyse projet → Pack LLM (recommandé)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Objectif : décrire ton projet dans AuroraStack, puis générer un pack (ZIP) à donner à un LLM codeur.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              1) Wizard brief :{" "}
              <Link className="underline underline-offset-4" href="/builder/brief">
                /builder/brief
              </Link>
            </li>
            <li>
              2) Si webapp :{" "}
              <Link className="underline underline-offset-4" href="/builder/app">
                /builder/app
              </Link>{" "}
              (objectif + description par page)
            </li>
            <li>
              2) Si site web :{" "}
              <Link className="underline underline-offset-4" href="/builder/landing">
                /builder/landing
              </Link>{" "}
              (objectif + CTA + messages par page)
            </li>
            <li>
              3) OpenRouter :{" "}
              <Link className="underline underline-offset-4" href="/settings">
                /settings
              </Link>{" "}
              → “LLM (OpenRouter)” (clé + modèle)
            </li>
            <li>
              4) Générer le pack : revenir dans{" "}
              <Link className="underline underline-offset-4" href="/builder/brief">
                /builder/brief
              </Link>{" "}
              → “Générer les documents” → Télécharger le ZIP
            </li>
          </ul>
          <p>
            Note : le pack contient un runbook + 3 prompts (00/10/20) pour éviter que le LLM enchaîne tout seul.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Démarrage rapide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Installation Docker uniquement.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              One-pass : <span className="font-mono">bash scripts/setup.sh</span>{" "}
              (ou PowerShell <span className="font-mono">scripts/setup.ps1</span>).
            </li>
            <li>
              URL : <span className="font-mono">http://localhost:19100/login</span>{" "}
              (port configurable via <span className="font-mono">.env</span>).
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Vibe coding (LLM)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Recommandé : utiliser un LLM en CLI (Codex/Claude/Gemini) pour itérer
            directement sur le code.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Donner au LLM : README + AGENTS + structure backend/frontend.</li>
            <li>Demander un plan court, puis faire des changements minimaux.</li>
            <li>Valider via Docker + migrations.</li>
          </ul>
          <p>
            Guides : <span className="font-mono">docs/VIBE_CODING.md</span> et{" "}
            <span className="font-mono">docs/PROMPTS.md</span>.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Thèmes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Un sélecteur de thème est disponible dans <b>Paramètres</b> (preview + persistance).
          </p>
          <p>
            Source des thèmes : <span className="font-mono">frontend/themes/aurora-themes.source.txt</span> (rebuild
            Docker nécessaire après modification).
          </p>
          <p>
            Si tu edits ta liste dans <span className="font-mono">shared/ui/themes stack.json</span> :{" "}
            <span className="font-mono">bash scripts/sync-themes.sh</span> puis rebuild.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
