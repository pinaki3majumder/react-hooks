import { render, RenderOptions, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import FlexContainer from "../../../src/components/Counter/FlexContainer";
import React from "react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { counterReducer } from "../../../src/redux/slices/counter";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import configureMockStore from "redux-mock-store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: Partial<{ count: any }>;
  store?: EnhancedStore;
  route?: string;
}

function renderWithStore(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { count: counterReducer },
      preloadedState,
    }),
    route = "/",
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

describe("FlexContainer Component", () => {
  it("shows loader when isLoading is true", () => {
    renderWithStore(<FlexContainer />, {
      preloadedState: { count: { value: 0, isLoading: true } },
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders List, Counter, and counterVal when not loading", () => {
    renderWithStore(<FlexContainer />, {
      preloadedState: { count: { value: 42, isLoading: false } },
    });

    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText(/counter/i)).toBeInTheDocument();
    expect(screen.getByText(/list/i)).toBeInTheDocument();
  });
});

describe("FlexContainer Component with redux-mock-store", () => {
  const mockStore = configureMockStore();

  it("shows loader when isLoading is true", () => {
    const store = mockStore({
      count: { value: 0, isLoading: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FlexContainer />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders List, Counter, and counterVal when not loading", () => {
    const store = mockStore({
      count: { value: 42, isLoading: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FlexContainer />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText(/counter/i)).toBeInTheDocument();
    expect(screen.getByText(/list/i)).toBeInTheDocument();
  });
});
