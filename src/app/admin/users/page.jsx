"use client";

import dynamic from "next/dynamic";

const Users = dynamic(() => import("@/modules/admin/users/components/Users"), {
  ssr: false,
  loading: () => <p>Загрузка...</p>,
});

export default function UsersPage() {
  return <Users />;
}
