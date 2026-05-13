import { NavSection } from "@/app/components/common/sidebar/desktop/SideMenuDesktop";
import { BarChart2, Home, Layers, LayoutDashboard, ListOrdered, Package, Settings, ShieldCheck, ShoppingCart, Tag, Users } from "lucide-react";

const NAV_SECTIONS: NavSection[] = [
  // ── MAIN ─ visible to all roles ─────────────────────────────────────────
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        // ADMIN lands on /admin-dashboard, everyone else on /dashboard
        url: (role) => (role === "ADMIN" ? "/admin-dashboard" : "/dashboard"),
        icon: LayoutDashboard,
        // no roles → all users see this item
      },
      {
        title: "Overview",
        url: "/dashboard",
        icon: Home,
      },
    ],
  },

  // ── STORE ─ visible to all roles, some sub-items restricted ─────────────
  {
    label: "Store",
    items: [
      {
        title: "E-commerce",
        url: "#",
        icon: ShoppingCart,
        items: [
          // All roles
          { title: "Dashboard", url: "/dashboard",    icon: LayoutDashboard },
          { title: "Products",  url: "/product",      icon: Package },
          { title: "Orders",    url: "/orders",        icon: ListOrdered },
          // ADMIN + MANAGER only
          { title: "Category",     url: "/category",     icon: Layers, roles: ["ADMIN", "MANAGER"] },
          { title: "Sub Category", url: "/sub-category", icon: Tag,    roles: ["ADMIN", "MANAGER"] },
        ],
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart2,
        roles: ["ADMIN", "MANAGER"], // hidden from USER
      },
    ],
  },

  // ── ADMIN ─ entire section visible to ADMIN only ─────────────────────────
  {
    label: "Admin",
    roles: ["ADMIN"],
    items: [
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
        roles: ["ADMIN"],
      },
      {
        title: "Roles & Permissions",
        url: "/admin/roles",
        icon: ShieldCheck,
        roles: ["ADMIN"],
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
        roles: ["ADMIN"],
      },
    ],
  },
];

export {
    NAV_SECTIONS
}