import { act, render, screen } from "@testing-library/react";

import Root from "./root.component";
import { getActiveNavItem } from "./components/sidebar/Sidebar";

const setPathname = (pathname) => {
  window.history.pushState({}, "", pathname);
};

const getActiveLinks = () =>
  screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("aria-current") === "page");

const expectActiveLink = (name) => {
  const link = screen.getByRole("link", { name });

  expect(link).toHaveAttribute("aria-current", "page");
  expect(getActiveLinks()).toHaveLength(1);

  return link;
};

const renderAtPathname = (pathname) => {
  setPathname(pathname);

  return render(<Root />);
};

describe("Root component", () => {
  afterEach(() => {
    setPathname("/bytebank-orchestrator/");
  });

  it("deve renderizar a navegação principal do ByteBank", () => {
    render(<Root />);

    expect(
      screen.getByRole("navigation", {
        name: /navegação principal/i,
      })
    ).toBeInTheDocument();
  });

  it("deve renderizar os links principais da sidebar", () => {
    render(<Root />);

    expect(screen.getByRole("link", { name: /início/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /conta/i })).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /transações/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /cartões/i })).toBeInTheDocument();
  });

  it.each([
    ["/bytebank-orchestrator/", /início/i],
    ["/bytebank-orchestrator/account", /conta/i],
    ["/bytebank-orchestrator/transaction", /transações/i],
    ["/bytebank-orchestrator/cards", /cartões/i],
    ["/bytebank-orchestrator/transaction/", /transações/i],
  ])("deve selecionar o item correto para %s", (pathname, name) => {
    renderAtPathname(pathname);

    expectActiveLink(name);
  });

  it("deve resolver o item ativo a partir do pathname sem aceitar prefixos inválidos", () => {
    expect(
      getActiveNavItem("/bytebank-orchestrator/transaction")
    ).toMatchObject({
      label: "Transações",
    });
    expect(
      getActiveNavItem("/bytebank-orchestrator/transaction-qualquer-coisa")
    ).toBeNull();
  });

  it("deve atualizar o item ativo quando a rota mudar pelo Single-SPA", () => {
    renderAtPathname("/bytebank-orchestrator/account");

    expectActiveLink(/conta/i);

    act(() => {
      setPathname("/bytebank-orchestrator/transaction");
      window.dispatchEvent(new CustomEvent("single-spa:routing-event"));
    });

    expectActiveLink(/transações/i);
  });

  it("deve atualizar o item ativo quando houver popstate", () => {
    renderAtPathname("/bytebank-orchestrator/transaction");

    expectActiveLink(/transações/i);

    act(() => {
      setPathname("/bytebank-orchestrator/cards");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expectActiveLink(/cartões/i);
  });
});
