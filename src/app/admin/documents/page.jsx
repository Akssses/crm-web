"use client";

import dynamic from "next/dynamic";

const Documents = dynamic(
  () => import("@/modules/operator/documents/components/Documents"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function DocumentsPage() {
  return <Documents />;
}
