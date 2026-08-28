import { render, screen } from "@testing-library/react";

import Root from "./root.component";

describe("Root component", () => {
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
});
