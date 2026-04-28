"use client";

import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import Authenticate from "./Authenticate";

export default function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <Authenticate />
            {children}
        </Provider>
    );
}