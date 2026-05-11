"use client";

import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import Authenticate from "./Authenticate";
import { usePathname } from "next/navigation";
import ProtectedRoute from "./ProtectedRoutes";

// routes.ts
export const publicRoutes = [
    "/login",
    "/signup",
    "/",
];

export default function ClientProviders({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const isPublic = publicRoutes.includes(pathname);
    return (
        <Provider store={store}>
            <Authenticate />
            {isPublic ? (
                children
            ) : (
                <ProtectedRoute>
                    {children}
                </ProtectedRoute>
            )}
        </Provider>
    );
}