import {
  CreditCard,
  Home,
  Landmark,
  ReceiptText,
} from "lucide-react";

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

export default function Sidebar() {
  const currentPath = window.location.pathname;

  return (
    <aside className="bb-sidebar">
      <div className="bb-sidebar__brand">
        <div className="bb-sidebar__brand-mark" aria-hidden="true">
          B
        </div>

        <div className="bb-sidebar__brand-content">
          <strong className="bb-sidebar__brand-name">
            ByteBank
          </strong>

          <span className="bb-sidebar__brand-subtitle">
            Digital Banking
          </span>
        </div>
      </div>

      <nav
        className="bb-sidebar__nav"
        aria-label="Navegação principal"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;

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
    </aside>
  );
}