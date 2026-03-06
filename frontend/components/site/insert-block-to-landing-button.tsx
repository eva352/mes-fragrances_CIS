"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { appendBlockToSitePage, type BlockInstance } from "@/lib/api/site-pages";
import { useAuth } from "@/lib/auth/context";
import { Button } from "@/components/ui/button";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `blk_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function InsertBlockToPageButton({
  pageSlug,
  pageLabel,
  block,
}: {
  pageSlug: string;
  pageLabel?: string;
  block: Omit<BlockInstance, "id">;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Button
      size="sm"
      disabled={isLoading || !isAuthenticated || isSaving}
      onClick={async () => {
        if (!isAuthenticated) {
          toast.error("Connectez-vous pour insérer un bloc.");
          return;
        }

        setIsSaving(true);
        try {
          await appendBlockToSitePage(pageSlug, { ...block, id: createId() });
          toast.success(`Bloc ajouté à ${pageLabel ?? "la page"}.`, {
            action: {
              label: "Builder",
              onClick: () => router.push(`/builder/landing?page=${encodeURIComponent(pageSlug)}`),
            },
          });
        } catch (error) {
          toast.error("Impossible d’ajouter le bloc.");
        } finally {
          setIsSaving(false);
        }
      }}
    >
      Insérer dans la page
    </Button>
  );
}
