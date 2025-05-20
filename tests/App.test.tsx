import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("App renders Layout component", () => {
  render(<App />);
  expect(screen.getByTestId("layout-wrapper")).toBeInTheDocument();
});
