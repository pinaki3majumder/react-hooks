import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../src/components/Home";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";

describe("Home", () => {
  it("should render successfully", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole("link");

    expect(links[0].textContent).toEqual("Counter");
    expect(links[0].href).toContain("http://localhost:3000/counter");
  });

  it("should get text from h1", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent("Topics :");
  });
});
