import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Charecters from "../../../src/components/Cartoon/Charecters";
import { GET_CHARACTERS } from "../../../src/graphql/queries";
import { beforeEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ApolloProvider } from "@apollo/client";
import client from "../../../src/apolloClient";

const mockCharacters = [
  {
    id: "1",
    name: "Rick Sanchez",
    gender: "Male",
    image: "https://rick.png",
  },
  {
    id: "2",
    name: "Morty Smith",
    gender: "Male",
    image: "https://morty.png",
  },
];

const mockData = {
  request: {
    query: GET_CHARACTERS,
    variables: {},
  },
  result: {
    data: {
      characters: {
        results: mockCharacters,
      },
    },
  },
};

beforeEach(() => {
  // mock image loading to call onload
  Object.defineProperty(global.Image.prototype, "src", {
    set() {
      setTimeout(() => this.onload?.(), 0);
    },
  });
});

describe("Charecters Component", () => {
  it("renders without errors", () => {
    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <Charecters />
      </MockedProvider>
    );

    expect(screen.getByText(/Filter:/)).toBeInTheDocument();
  });

  it("renders loading skeletons initially", async () => {
    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <Charecters />
      </MockedProvider>
    );

    expect(screen.getByText(/Filter:/i)).toBeInTheDocument();

    // Wait for skeleton cards to load
    const char = await screen.findByText("Rick Sanchez");
    expect(char).toBeInTheDocument();
  });

  it("filters by gender", async () => {
    const maleMock = {
      request: {
        query: GET_CHARACTERS,
        variables: { gender: "Male" },
      },
      result: {
        data: {
          characters: {
            results: [mockCharacters[0]], // only Rick
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[mockData, maleMock]} addTypename={false}>
        <Charecters />
      </MockedProvider>
    );

    // Wait for first data to load
    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    });

    // Click Male Filter
    const maleButton = screen.getByRole("button", { name: "Male" });
    fireEvent.click(maleButton);

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    });
  });

  it("displays error if query fails", async () => {
    const errorMock = {
      request: {
        query: GET_CHARACTERS,
      },
      error: new Error("Network error"),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <Charecters />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Error fetching characters/i)
      ).toBeInTheDocument();
    });
  });

  it("renders Characters with real client (no mocks)", () => {
    render(
      <ApolloProvider client={client}>
        <Charecters />
      </ApolloProvider>
    );

    // expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });
});
