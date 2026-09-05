import { act, render, screen } from "@testing-library/react";

import Root from "./root.component";
import { getActiveNavItem } from "./components/sidebar/Sidebar";
import { navbarUser } from "./data/user.mock";
import {
  loadUserWidgetParcel,
  USER_WIDGET_PARCEL_NAME,
} from "./parcels/userWidgetParcel";

const mockParcelPropsHistory = [];

jest.mock("single-spa-react/parcel", () => {
  const React = require("react");

  return function MockParcel(props) {
    mockParcelPropsHistory.push(props);

    return React.createElement("div", {
      "data-testid": "user-widget-parcel",
    });
  };
});

const navHrefs = [
  "/bytebank-orchestrator/",
  "/bytebank-orchestrator/account",
  "/bytebank-orchestrator/transaction",
  "/bytebank-orchestrator/cards",
];

const setPathname = (pathname) => {
  window.history.pushState({}, "", pathname);
};

const getNavLinkByHref = (href) =>
  screen
    .getAllByRole("link")
    .find((link) => link.getAttribute("href") === href);

const getActiveLinks = () =>
  screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("aria-current") === "page");

const expectActiveHref = (href) => {
  const link = getNavLinkByHref(href);

  expect(link).toHaveAttribute("aria-current", "page");
  expect(getActiveLinks()).toHaveLength(1);

  return link;
};

const getLatestParcelProps = () =>
  mockParcelPropsHistory[mockParcelPropsHistory.length - 1];

const renderAtPathname = (pathname) => {
  setPathname(pathname);

  return render(<Root />);
};

describe("Root component", () => {
  afterEach(() => {
    mockParcelPropsHistory.length = 0;
    jest.restoreAllMocks();
    delete window.System;
    setPathname("/bytebank-orchestrator/");
  });

  it("deve renderizar a navegacao principal do ByteBank", () => {
    render(<Root />);

    expect(
      screen.getByRole("navigation", { name: /navega/i })
    ).toBeInTheDocument();
  });

  it("deve renderizar os links principais da sidebar", () => {
    render(<Root />);

    navHrefs.forEach((href) => {
      expect(getNavLinkByHref(href)).toBeInTheDocument();
    });
  });

  it.each([
    ["/bytebank-orchestrator/", "/bytebank-orchestrator/"],
    ["/bytebank-orchestrator/account", "/bytebank-orchestrator/account"],
    [
      "/bytebank-orchestrator/transaction",
      "/bytebank-orchestrator/transaction",
    ],
    ["/bytebank-orchestrator/cards", "/bytebank-orchestrator/cards"],
    [
      "/bytebank-orchestrator/transaction/",
      "/bytebank-orchestrator/transaction",
    ],
  ])("deve selecionar o item correto para %s", (pathname, href) => {
    renderAtPathname(pathname);

    expectActiveHref(href);
  });

  it("deve resolver o item ativo a partir do pathname sem aceitar prefixos invalidos", () => {
    expect(
      getActiveNavItem("/bytebank-orchestrator/transaction")
    ).toMatchObject({
      href: "/bytebank-orchestrator/transaction",
    });
    expect(
      getActiveNavItem("/bytebank-orchestrator/transaction-qualquer-coisa")
    ).toBeNull();
  });

  it("deve atualizar o item ativo quando a rota mudar pelo Single-SPA", () => {
    renderAtPathname("/bytebank-orchestrator/account");

    expectActiveHref("/bytebank-orchestrator/account");

    act(() => {
      setPathname("/bytebank-orchestrator/transaction");
      window.dispatchEvent(new CustomEvent("single-spa:routing-event"));
    });

    expectActiveHref("/bytebank-orchestrator/transaction");
  });

  it("deve atualizar o item ativo quando houver popstate", () => {
    renderAtPathname("/bytebank-orchestrator/transaction");

    expectActiveHref("/bytebank-orchestrator/transaction");

    act(() => {
      setPathname("/bytebank-orchestrator/cards");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expectActiveHref("/bytebank-orchestrator/cards");
  });

  it("deve montar o Parcel do user widget com o contrato publico", () => {
    render(<Root />);

    expect(screen.getByTestId("user-widget-parcel")).toBeInTheDocument();
    expect(getLatestParcelProps()).toEqual(
      expect.objectContaining({
        config: loadUserWidgetParcel,
        user: navbarUser,
        onProfile: expect.any(Function),
        onLogout: expect.any(Function),
        handleError: expect.any(Function),
      })
    );
  });

  it("deve carregar o user widget pelo import map do SystemJS", async () => {
    const parcelConfig = {
      bootstrap: jest.fn(),
      mount: jest.fn(),
      unmount: jest.fn(),
    };
    const importMock = jest.fn().mockResolvedValue(parcelConfig);

    window.System = {
      import: importMock,
    };

    await expect(loadUserWidgetParcel()).resolves.toBe(parcelConfig);
    expect(importMock).toHaveBeenCalledWith(USER_WIDGET_PARCEL_NAME);
  });

  it("deve rejeitar o carregamento quando o import map nao fornecer o user widget", async () => {
    await expect(loadUserWidgetParcel()).rejects.toThrow(
      USER_WIDGET_PARCEL_NAME
    );
  });

  it("deve manter o callback de Perfil neutro sem navegar para account", () => {
    renderAtPathname("/bytebank-orchestrator/transaction");

    act(() => {
      getLatestParcelProps().onProfile();
    });

    expect(window.location.pathname).toBe("/bytebank-orchestrator/transaction");
    expectActiveHref("/bytebank-orchestrator/transaction");
  });

  it("deve manter o callback de Sair neutro sem manipular storage", () => {
    const clearSpy = jest.spyOn(Storage.prototype, "clear");
    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

    render(<Root />);

    act(() => {
      getLatestParcelProps().onLogout();
    });

    expect(clearSpy).not.toHaveBeenCalled();
    expect(removeItemSpy).not.toHaveBeenCalled();
  });
});
