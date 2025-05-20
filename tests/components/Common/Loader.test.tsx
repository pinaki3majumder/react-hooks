import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../../../src/components/Common/Loader";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Loader Component", () => {
  it("renders Loading... in <h1> when size is 'lg'", () => {
    render(<Loader size="lg" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Loading...");
  });

  it("renders Loading... in <h2> when size is 'md'", () => {
    render(<Loader size="md" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Loading...");
  });

  it("renders Loading... in <h3> when size is 'sm'", () => {
    render(<Loader size="sm" />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Loading...");
  });

  it("defaults to <h1> when no size is provided", () => {
    render(<Loader />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Loading...");
  });
});
