"use client";

import React, { useState } from "react";
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
} from "lucide-react";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface NavSubItem {
  title: string;
  url: string;
  icon?: React.ElementType;
}

export interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  items?: NavSubItem[];
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

// ─── Sub Item ─────────────────────────────────────────────────────────────────

interface SubItemProps {
  item: NavSubItem;
  currentPath?: string;
}

const SubItem: React.FC<SubItemProps> = ({ item, currentPath }) => {
  const SubIcon = item.icon;
  const isActive = currentPath === item.url;

  return (
    <a
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
    </a>
  );
};

// ─── Menu Item ────────────────────────────────────────────────────────────────

interface MenuItemProps {
  item: NavItem;
  isOpen: boolean;
  currentPath?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isOpen, currentPath }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const Icon = item.icon;

  const isActive =
    currentPath === item.url ||
    item.items?.some((s) => s.url === currentPath);

  const hasChildren = !!item.items?.length;

  const handleClick = () => {
    if (hasChildren && isOpen) setIsExpanded((p) => !p);
  };

  const baseRow = `
    relative flex items-center rounded-lg
    transition-colors duration-150 cursor-pointer select-none
    ${isActive
      ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
      : "text-[var(--color-nav-text)] hover:bg-[var(--color-nav-hover)] hover:text-[var(--color-nav-text)]"
    }
  `;

  // ── Collapsed: icon only, perfectly centered ─────────────────────────────
  if (!isOpen) {
    return (
      <div className="mb-0.5">
        <a
          href={hasChildren ? undefined : item.url}
          onClick={hasChildren ? handleClick : undefined}
          title={item.title}
          className={`${baseRow} w-full h-10 flex justify-center items-center`}
        >
          {/* Active accent line */}
          {isActive && (
            <span className="absolute left-0 inset-y-2 w-[3px] bg-[var(--color-primary)] rounded-r-full" />
          )}
          <Icon
            size={18}
            className={`
              flex-shrink-0
              ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-nav-icon)]"}
            `}
          />
        </a>
      </div>
    );
  }

  // ── Expanded: icon + label ───────────────────────────────────────────────
  return (
    <div className="mb-0.5">
      <a
        href={hasChildren ? undefined : item.url}
        onClick={hasChildren ? handleClick : undefined}
        className={`${baseRow} w-full h-10 px-3 gap-3`}
      >
        {/* Active accent line */}
        {isActive && (
          <span className="absolute left-0 inset-y-2 w-[3px] bg-[var(--color-primary)] rounded-r-full" />
        )}

        {/* Icon */}
        <span
          className={`
            flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md
            transition-colors duration-150
            ${isActive
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-icon-bg)] text-[var(--color-nav-icon)] group-hover:bg-[var(--color-icon-bg-hover)]"
            }
          `}
        >
          <Icon size={15} />
        </span>

        {/* Label */}
        <span className="flex-1 text-sm font-medium leading-none truncate">
          {item.title}
        </span>

        {/* Badge */}
        {item.badge && (
          <span
            className="
              flex-shrink-0 px-1.5 py-0.5 rounded-full
              text-[10px] font-semibold leading-none
              bg-[var(--color-primary)] text-white
            "
          >
            {item.badge}
          </span>
        )}

        {/* Chevron for sub-menus */}
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
      </a>

      {/* Sub-items */}
      {hasChildren && isExpanded && (
        <div className="mt-0.5 mb-1">
          {item.items!.map((sub, i) => (
            <SubItem key={i} item={sub} currentPath={currentPath} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const navSections: NavSection[] = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Overview",
        url: "/overview",
        icon: Home,
      },
    ],
  },
  {
    label: "Store",
    items: [
      {
        title: "E-commerce",
        url: "#",
        icon: ShoppingCart,
        items: [
          { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
          { title: "Category", url: "/category", icon: Layers },
          { title: "Sub Category", url: "/sub-category", icon: Tag },
          { title: "Products", url: "/product", icon: Package },
          { title: "Orders", url: "/orders", icon: ListOrdered },
        ],
      },
    ],
  },
];

// ─── Section Label ────────────────────────────────────────────────────────────

interface SectionLabelProps {
  label: string;
  isOpen: boolean;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ label, isOpen }) => {
  if (!isOpen) {
    // Render a thin divider line in place of label when collapsed
    return (
      <div className="mx-3 my-2 h-px bg-[var(--color-border)]" />
    );
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

  // In real usage, get from usePathname()
  const currentPath = "/dashboard";

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

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div
          className={`
            flex-shrink-0 flex items-center h-[60px]
            border-b border-[var(--color-border)]
            ${isOpen ? "px-4 justify-between" : "justify-center"}
          `}
        >
          {/* Logo */}
          <div className={`flex items-center gap-2.5 ${!isOpen && "hidden"}`}>
            <span
              className="
                w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center
                bg-[var(--color-primary)]
              "
            >
              <Zap size={14} className="text-white" fill="white" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-[var(--color-heading)] tracking-tight">
                MyApp
              </p>
              <p className="text-[10px] text-[var(--color-nav-muted)] leading-none">
                Admin v2.0
              </p>
            </div>
          </div>

          {/* When collapsed, show just the logo icon */}
          {!isOpen && (
            <span
              className="
                w-8 h-8 rounded-lg flex items-center justify-center
                bg-[var(--color-primary)]
              "
            >
              <Zap size={15} className="text-white" fill="white" />
            </span>
          )}

          {/* Toggle button — only visible when open */}
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

        {/* ── Open toggle when collapsed ──────────────────────────────────── */}
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

        {/* ── Navigation ─────────────────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
          {navSections.map((section, si) => (
            <div key={si}>
              <SectionLabel label={section.label} isOpen={isOpen} />
              {section.items.map((item, ii) => (
                <MenuItem
                  key={ii}
                  item={item}
                  isOpen={isOpen}
                  currentPath={currentPath}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* ── Footer / User ───────────────────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-[var(--color-border)] p-2">
          {isOpen ? (
            /* Expanded user row */
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--color-nav-hover)] transition-colors duration-150 cursor-pointer group">
              {/* Avatar */}
              <span
                className="
                  flex-shrink-0 w-8 h-8 rounded-lg
                  flex items-center justify-center
                  bg-[var(--color-primary-soft)]
                  text-[var(--color-primary)]
                  text-xs font-bold
                "
              >
                AU
              </span>
              {/* Info */}
              <div className="flex-1 min-w-0 leading-tight">
                <p className="text-xs font-semibold text-[var(--color-heading)] truncate">
                  Admin User
                </p>
                <p className="text-[11px] text-[var(--color-nav-muted)] truncate">
                  admin@myapp.com
                </p>
              </div>
              {/* Logout */}
              <LogOut
                size={14}
                className="
                  flex-shrink-0 text-[var(--color-nav-muted)]
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-150
                "
              />
            </div>
          ) : (
            /* Collapsed: just avatar, centered */
            <div className="flex justify-center py-1">
              <span
                title="Admin User"
                className="
                  w-9 h-9 rounded-lg flex items-center justify-center
                  bg-[var(--color-primary-soft)]
                  text-[var(--color-primary)]
                  text-xs font-bold cursor-pointer
                  hover:bg-[var(--color-primary)] hover:text-white
                  transition-colors duration-150
                "
              >
                AU
              </span>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideMenuDesktop;