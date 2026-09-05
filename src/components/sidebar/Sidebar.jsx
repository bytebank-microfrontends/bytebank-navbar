import { useEffect, useState } from "react";
import { CreditCard, Home, Landmark, ReceiptText } from "lucide-react";
import BrandLogo from "../brand-logo/BrandLogo";
import UserWidgetParcel from "./UserWidgetParcel";

const navigationItems = [
  {
    label: "Início",
    href: "/bytebank-orchestrator/",
    icon: Home,
  },
  {
    label: "Conta",
    href: "/bytebank-orchestrator/account",
    icon: Landmark,
  },
  {
    label: "Transações",
    href: "/bytebank-orchestrator/transaction",
    icon: ReceiptText,
  },
  {
    label: "Cartões",
    href: "/bytebank-orchestrator/cards",
    icon: CreditCard,
  },
];

const normalizePathname = (pathname) => {
  const pathnameWithoutTrailingSlash = pathname.replace(/\/+$/, "");

  return pathnameWithoutTrailingSlash === "/bytebank-orchestrator"
    ? "/bytebank-orchestrator/"
    : pathnameWithoutTrailingSlash;
};

export const getActiveNavItem = (pathname) => {
  const normalizedPathname = normalizePathname(pathname);

  return (
    navigationItems.find(
      (item) => normalizePathname(item.href) === normalizedPathname
    ) ?? null
  );
};

const getCurrentActiveHref = () =>
  getActiveNavItem(window.location.pathname)?.href ?? null;

export default function Sidebar() {
  const [activeHref, setActiveHref] = useState(getCurrentActiveHref);

  useEffect(() => {
    const syncActiveItemWithRoute = () => {
      setActiveHref(getCurrentActiveHref());
    };

    window.addEventListener(
      "single-spa:routing-event",
      syncActiveItemWithRoute
    );
    window.addEventListener("popstate", syncActiveItemWithRoute);

    return () => {
      window.removeEventListener(
        "single-spa:routing-event",
        syncActiveItemWithRoute
      );
      window.removeEventListener("popstate", syncActiveItemWithRoute);
    };
  }, []);

  return (
    <aside className="bb-sidebar">
      <div className="bb-sidebar__brand">
        <BrandLogo />

        <div className="bb-sidebar__brand-content">
          <strong className="bb-sidebar__brand-name">ByteBank</strong>

          <span className="bb-sidebar__brand-subtitle">Digital Banking</span>
        </div>
      </div>

      <nav className="bb-sidebar__nav" aria-label="Navegação principal">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeHref === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`bb-sidebar__link ${
                isActive ? "bb-sidebar__link--active" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className="bb-sidebar__link-icon"
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <footer className="bb-sidebar__footer">
        <UserWidgetParcel />
      </footer>
    </aside>
  );
}
