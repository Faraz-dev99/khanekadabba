"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // If they are logged in, get them off the public pages!
      if (user.role === "ADMIN") {
        router.replace("/admin-dashboard");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) return <div className="grid place-items-center min-h-screen">Loading...</div>;

  // Don't show the login form if they are logged in (prevents flashing)
  if (user) return null; 

  return <>{children}</>;
}