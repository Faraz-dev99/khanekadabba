"use client";

import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import Authenticate from "./Authenticate";
import { usePathname } from "next/navigation";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import SideMenuDesktop from "@/app/components/common/sidebar/desktop/SideMenuDesktop";

// ─── Public routes ────────────────────────────────────────────────────────────
export const publicRoutes: string[] = ["/login", "/signup", "/"];

// ─── ClientProviders ──────────────────────────────────────────────────────────
export default function ClientProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublic = publicRoutes.includes(pathname);

  return (
    <Provider store={store}>
      <Authenticate />

      {isPublic ? (
        <PublicRoute>{children}</PublicRoute>
      ) : (
        <ProtectedRoute>
          {/*
           * Root shell: full-viewport, no overflow.
           * Sidebar manages its own width — the flex row adapts automatically.
           */}
          <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-page-bg)]">

            {/* Sidebar — fully self-contained */}
            <SideMenuDesktop />

            {/* Right column */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

              {/* Header */}
              <header
                className="
                  flex-shrink-0 flex items-center h-[60px] px-6
                  bg-[var(--color-header-bg)]
                  border-b border-[var(--color-border)]
                "
              >
                <h2 className="text-sm font-semibold text-[var(--color-heading)]">
                  Page Header
                </h2>
              </header>

              {/* Scrollable content */}
              <main className="flex-1 overflow-y-auto p-6 bg-[var(--color-page-bg)]">
                <div className="max-w-6xl mx-auto">
                  {children}
                </div>
              </main>

            </div>
          </div>
        </ProtectedRoute>
      )}
    </Provider>
  );
}