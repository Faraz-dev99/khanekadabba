"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
 const { user,loading } = useAppSelector((state) => state.auth)
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // go to admin login, NOT "/"
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) return null; // prevent flash

  return <>{children}</>;
}
