import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../../../src/components/Counter/Counter";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../../../src/redux/slices/counter";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

// Create a test store
const renderWithStore = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      count: counterReducer,
    },
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe("Counter Component", () => {
  it("renders initial counter value", () => {
    renderWithStore(<Counter />);
    expect(screen.getByText(/COUNTER:/i)).toHaveTextContent("COUNTER: 0");
  });

  it("increments the counter on + button click", () => {
    renderWithStore(<Counter />);
    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText(/COUNTER:/i)).toHaveTextContent("COUNTER: 1");
  });

  it("decrements the counter on - button click", () => {
    renderWithStore(<Counter />);
    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText(/COUNTER:/i)).toHaveTextContent("COUNTER: -1");
  });

  it("resets the counter on RESET button click", () => {
    renderWithStore(<Counter />);
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("RESET"));
    expect(screen.getByText(/COUNTER:/i)).toHaveTextContent("COUNTER: 0");
  });

  it("increments by given number", () => {
    renderWithStore(<Counter />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: 5 } });
    fireEvent.click(screen.getByText("INCREMENT BY NUMBER"));
    expect(screen.getByText(/COUNTER:/i)).toHaveTextContent("COUNTER: 5");
  });

  //   it("increments asynchronously", async () => {
  //     jest.useFakeTimers(); // mock timers for async thunk
  //     renderWithStore(<Counter />);
  //     const input = screen.getByRole("spinbutton");
  //     fireEvent.change(input, { target: { value: 3 } });
  //     fireEvent.click(screen.getByText("INCREMENT BY ASYNC"));

  //     // Fast-forward async action delay
  //     jest.runAllTimers();

  //     // Await DOM update
  //     const final = await screen.findByText("COUNTER: 3");
  //     expect(final).toBeInTheDocument();
  //   });
});
