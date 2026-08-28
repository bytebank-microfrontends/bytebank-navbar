const navigationItems = [
  {
    label: "Início",
    href: "/bytebank-orchestrator/",
  },
  {
    label: "Conta",
    href: "/bytebank-orchestrator/account",
  },
  {
    label: "Transações",
    href: "/bytebank-orchestrator/transaction",
  },
  {
    label: "Cartões",
    href: "/bytebank-orchestrator/cards",
  },
];

export default function Sidebar() {
  const currentPath = window.location.pathname;

  return (
    <aside className="bb-sidebar">
      <div className="bb-sidebar__brand">
        <div className="bb-sidebar__brand-mark">B</div>

        <div>
          <strong className="bb-sidebar__brand-name">ByteBank</strong>
          <span className="bb-sidebar__brand-subtitle">Digital Banking</span>
        </div>
      </div>

      <nav className="bb-sidebar__nav" aria-label="Navegação principal">
        {navigationItems.map((item) => {
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
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
