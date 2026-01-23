// components/providers/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    // Fetch user data when app loads
    fetchUser();
  }, [fetchUser]);

  return <>{children}</>;
}
