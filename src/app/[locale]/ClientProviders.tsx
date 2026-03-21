"use client";

import { ClientWidgets } from "@/components/layout/ClientWidgets";
import { AIConcierge } from "@/features/concierge/AIConcierge";

export function ClientProviders() {
  return (
    <>
      <ClientWidgets />
      <AIConcierge />
    </>
  );
}
