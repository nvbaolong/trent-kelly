import React, { Suspense } from "react";
import { MACHINERY_CATALOG } from "@/data/machinery";
import MachineryDetailClient from "./MachineryDetailClient";

export function generateStaticParams() {
  return MACHINERY_CATALOG.map((item) => ({
    slug: item.slug,
  }));
}

async function MachineryDetailAsync({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <MachineryDetailClient slug={slug} />;
}

export default function MachineryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center text-xs font-semibold text-zinc-500 font-sans">
          Loading equipment specifications...
        </div>
      }
    >
      <MachineryDetailAsync params={params} />
    </Suspense>
  );
}
