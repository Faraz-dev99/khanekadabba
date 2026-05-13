"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
 const { user,loading } = useAppSelector((state) => state.auth)
  const router = useRouter();

  useEffect(() => {
    if (user && user?.role==="ADMIN") {
      router.replace("/admin-dashboard"); // go to admin login, NOT "/"
    }
    else if(user){
        router.replace("/dashboard");
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
