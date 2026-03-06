"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppRuntime } from "@/components/app-runtime-context";

export default function AppIndexPage() {
  const router = useRouter();
  const { envelope } = useAppRuntime();

  useEffect(() => {
    const first = envelope.spec.shell.navigation[0]?.path ?? "/app/dashboard";
    router.replace(first);
  }, [envelope.spec.shell.navigation, router]);

  return null;
}

