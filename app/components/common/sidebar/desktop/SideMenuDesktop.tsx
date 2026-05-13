"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  Home,
  ShoppingCart,
  LayoutDashboard,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  Tag,
  Package,
  ListOrdered,
  Layers,
  LogOut,
  ShieldCheck,
  Users,
  BarChart2,
  Settings,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks"; // adjust to your hooks path
import { NAV_SECTIONS } from "@/app/data/sidebar/sidebarData";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Role Types ───────────────────────────────────────────────────────────────

export type UserRole = "ADMIN" | "MANAGER" | "USER";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface NavSubItem {
  title: string;
  url: string;
  icon?: React.ElementType;
  /**
   * Leave undefined  → visible to ALL roles
   * Define roles[]   → only those roles see this item
   */
  roles?: UserRole[];
}

export interface NavItem {
  /**
   * url can be a static string OR a function that receives the current role
   * and returns the correct URL — perfect for role-based redirects.
   *
   * Example:
   *   url: (role) => role === "ADMIN" ? "/admin-dashboard" : "/dashboard"
   */
  url: string | ((role: UserRole | undefined) => string);
  title: string;
  icon: React.ElementType;
  items?: NavSubItem[];
  badge?: string;
  roles?: UserRole[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
  /** Hide the entire section from certain roles */
  roles?: UserRole[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** True when item has no role restriction, or user's role is in the list */
function canSee(
  itemRoles: UserRole[] | undefined,
  userRole: UserRole | undefined
): boolean {
  if (!itemRoles || itemRoles.length === 0) return true;
  if (!userRole) return false;
  return itemRoles.includes(userRole);
}

/** Resolve static string OR role-based function to a final URL */
function resolveUrl(
  url: string | ((role: UserRole | undefined) => string),
  role: UserRole | undefined
): string {
  return typeof url === "function" ? url(role) : url;
}

// ─── Nav Definition ───────────────────────────────────────────────────────────
//
//  Quick reference:
//  ┌─────────────────────────────────────────────────────────────┐
//  │  Visible to ALL         →  omit `roles` entirely            │
//  │  ADMIN only             →  roles: ["ADMIN"]                 │
//  │  ADMIN + MANAGER        →  roles: ["ADMIN", "MANAGER"]      │
//  │  Role-based URL         →  url: (r) => r==="ADMIN"?"/a":"/b"│
//  └─────────────────────────────────────────────────────────────┘
//
// ─────────────────────────────────────────────────────────────────────────────



// ─── Sub Item ─────────────────────────────────────────────────────────────────

interface SubItemProps {
  item: NavSubItem;
  currentPath: string;
  userRole: UserRole | undefined;
}

const SubItem: React.FC<SubItemProps> = ({ item, currentPath, userRole }) => {
  if (!canSee(item.roles, userRole)) return null;

  const SubIcon = item.icon;
  const isActive = currentPath === item.url;

  return (
    <Link
      href={item.url}
      className={`
        flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-lg text-sm
        transition-colors duration-150
        ${
          isActive
            ? "text-[var(--color-primary)] bg-[var(--color-primary-soft)] font-medium"
            : "text-[var(--color-nav-muted)] hover:text-[var(--color-nav-text)] hover:bg-[var(--color-nav-hover)]"
        }
      `}
    >
      {SubIcon ? (
        <SubIcon size={14} className="flex-shrink-0 opacity-70" />
      ) : (
        <span
          className={`
            flex-shrink-0 w-1.5 h-1.5 rounded-full
            ${isActive ? "bg-[var(--color-primary)]" : "bg-[var(--color-nav-muted)] opacity-50"}
          `}
        />
      )}
      {item.title}
    </Link>
  );
};

// ─── Menu Item ────────────────────────────────────────────────────────────────

interface MenuItemProps {
  item: NavItem;
  isOpen: boolean;
  currentPath: string;
  userRole: UserRole | undefined;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isOpen,
  currentPath,
  userRole,
}) => {
  if (!canSee(item.roles, userRole)) return null;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const Icon = item.icon;
  const resolvedUrl = resolveUrl(item.url, userRole);
  const hasChildren = !!item.items?.length;

  const isActive =
    currentPath === resolvedUrl ||
    item.items
      ?.filter((s) => canSee(s.roles, userRole))
      .some((s) => s.url === currentPath);

  const handleClick = () => {
    if (hasChildren && isOpen) setIsExpanded((p) => !p);
  };

  const baseRow = `
    relative flex items-center rounded-lg
    transition-colors duration-150 cursor-pointer select-none
    ${
      isActive
        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
        : "text-[var(--color-nav-text)] hover:bg-[var(--color-nav-hover)]"
    }
  `;

  // ── Inner content shared by both button and Link ─────────────────────────
  const innerContent = (
    <>
      {isActive && (
        <span className="absolute left-0 inset-y-2 w-[3px] bg-[var(--color-primary)] rounded-r-full" />
      )}
      <span
        className={`
          flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md
          transition-colors duration-150
          ${
            isActive
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-icon-bg)] text-[var(--color-nav-icon)]"
          }
        `}
      >
        <Icon size={15} />
      </span>

      <span className="flex-1 text-sm font-medium leading-none truncate">
        {item.title}
      </span>

      {item.badge && (
        <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none bg-[var(--color-primary)] text-white">
          {item.badge}
        </span>
      )}

      {hasChildren && (
        <ChevronDown
          size={14}
          className={`
            flex-shrink-0 text-[var(--color-nav-muted)]
            transition-transform duration-200
            ${isExpanded ? "rotate-0" : "-rotate-90"}
          `}
        />
      )}
    </>
  );

  // ── Collapsed: icon only ──────────────────────────────────────────────────
  if (!isOpen) {
    return (
      <div className="mb-0.5">
        {hasChildren ? (
          <button
            onClick={handleClick}
            title={item.title}
            className={`${baseRow} w-full h-10 flex justify-center items-center`}
          >
            {isActive && (
              <span className="absolute left-0 inset-y-2 w-[3px] bg-[var(--color-primary)] rounded-r-full" />
            )}
            <Icon
              size={18}
              className={`flex-shrink-0 ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-nav-icon)]"}`}
            />
          </button>
        ) : (
          <Link
            href={resolvedUrl}
            title={item.title}
            className={`${baseRow} w-full h-10 flex justify-center items-center`}
          >
            {isActive && (
              <span className="absolute left-0 inset-y-2 w-[3px] bg-[var(--color-primary)] rounded-r-full" />
            )}
            <Icon
              size={18}
              className={`flex-shrink-0 ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-nav-icon)]"}`}
            />
          </Link>
        )}
      </div>
    );
  }

  // ── Expanded: icon + label ────────────────────────────────────────────────
  return (
    <div className="mb-0.5">
      {hasChildren ? (
        <button
          onClick={handleClick}
          className={`${baseRow} w-full h-10 px-3 gap-3`}
        >
          {innerContent}
        </button>
      ) : (
        <Link
          href={resolvedUrl}
          className={`${baseRow} w-full h-10 px-3 gap-3`}
        >
          {innerContent}
        </Link>
      )}

      {hasChildren && isExpanded && (
        <div className="mt-0.5 mb-1">
          {item.items!.map((sub, i) => (
            <SubItem
              key={i}
              item={sub}
              currentPath={currentPath}
              userRole={userRole}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Section Label ────────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ label: string; isOpen: boolean }> = ({
  label,
  isOpen,
}) => {
  if (!isOpen) {
    return <div className="mx-3 my-2 h-px bg-[var(--color-border)]" />;
  }
  return (
    <p className="px-3 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-nav-muted)] select-none">
      {label}
    </p>
  );
};

// ─── SideMenuDesktop ──────────────────────────────────────────────────────────

const SideMenuDesktop: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { user, loading } = useAppSelector((state) => state.auth);

  const userRole = user?.role as UserRole | undefined;

  // Filter sections once per role change — no re-filtering on every render
  const visibleSections = useMemo(
    () => NAV_SECTIONS.filter((s) => canSee(s.roles, userRole)),
    [userRole]
  );

  // Derive initials for avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  // While auth is resolving, render a skeleton shell so layout doesn't jump
  if (loading) {
    return (
      <div
        className={`
          flex-shrink-0 h-screen
          bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border)]
          transition-[width] duration-300
          ${isOpen ? "w-[260px]" : "w-[64px]"}
        `}
      />
    );
  }

  // Real pathname should come from usePathname() — using window.location as fallback
 const currentPath = usePathname();

  return (
    <div className="relative flex-shrink-0 h-screen">
      <aside
        className={`
          flex flex-col h-full
          bg-[var(--color-sidebar-bg)]
          border-r border-[var(--color-border)]
          transition-[width] duration-300 ease-in-out
          overflow-hidden
          ${isOpen ? "w-[260px]" : "w-[64px]"}
        `}
      >
        {/* ── Header ───────────────────────────────────────────────────── */}
        <div
          className={`
            flex-shrink-0 flex items-center h-[60px]
            border-b border-[var(--color-border)]
            ${isOpen ? "px-4 justify-between" : "justify-center"}
          `}
        >
          {/* Logo + name (hidden when collapsed) */}
          <div className={`flex items-center gap-2.5 ${!isOpen && "hidden"}`}>
            <span className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center bg-[var(--color-primary)]">
              <Zap size={14} className="text-white" fill="white" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-[var(--color-heading)] tracking-tight">
                MyApp
              </p>
              <p className="text-[10px] text-[var(--color-nav-muted)] leading-none capitalize">
                {userRole?.toLowerCase() ?? "guest"}
              </p>
            </div>
          </div>

          {/* Logo icon only when collapsed */}
          {!isOpen && (
            <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-primary)]">
              <Zap size={15} className="text-white" fill="white" />
            </span>
          )}

          {/* Collapse button */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Collapse sidebar"
              className="
                w-7 h-7 flex items-center justify-center rounded-lg
                text-[var(--color-nav-muted)]
                hover:bg-[var(--color-nav-hover)]
                hover:text-[var(--color-nav-text)]
                transition-colors duration-150
              "
            >
              <PanelLeftClose size={16} />
            </button>
          )}
        </div>

        {/* Expand button (shown below logo when collapsed) */}
        {!isOpen && (
          <div className="flex-shrink-0 flex justify-center py-2 border-b border-[var(--color-border)]">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Expand sidebar"
              className="
                w-9 h-9 flex items-center justify-center rounded-lg
                text-[var(--color-nav-muted)]
                hover:bg-[var(--color-nav-hover)]
                hover:text-[var(--color-nav-text)]
                transition-colors duration-150
              "
            >
              <PanelLeftOpen size={16} />
            </button>
          </div>
        )}

        {/* ── Navigation ───────────────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
          {visibleSections.map((section, si) => (
            <div key={si}>
              <SectionLabel label={section.label} isOpen={isOpen} />
              {section.items.map((item, ii) => (
                <MenuItem
                  key={ii}
                  item={item}
                  isOpen={isOpen}
                  currentPath={currentPath}
                  userRole={userRole}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* ── Footer / User ─────────────────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-[var(--color-border)] p-2">
          {isOpen ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--color-nav-hover)] transition-colors duration-150 cursor-pointer group">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-primary-soft)] text-[var(--color-primary)] text-xs font-bold">
                {initials}
              </span>
              <div className="flex-1 min-w-0 leading-tight">
                <p className="text-xs font-semibold text-[var(--color-heading)] truncate">
                  {user?.name ?? "Guest"}
                </p>
                <p className="text-[11px] text-[var(--color-nav-muted)] truncate">
                  {user?.email ?? ""}
                </p>
              </div>
              <LogOut
                size={14}
                className="flex-shrink-0 text-[var(--color-nav-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              />
            </div>
          ) : (
            <div className="flex justify-center py-1">
              <span
                title={user?.name ?? "Guest"}
                className="
                  w-9 h-9 rounded-lg flex items-center justify-center
                  bg-[var(--color-primary-soft)] text-[var(--color-primary)]
                  text-xs font-bold cursor-pointer
                  hover:bg-[var(--color-primary)] hover:text-white
                  transition-colors duration-150
                "
              >
                {initials}
              </span>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideMenuDesktop;