import React from "react";
import { store } from "../../src/redux/store";
import { beforeEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { incrementByAmount, reset } from "../../src/redux/slices/counter";

describe("Redux store setup", () => {
    beforeEach(() => {
        store.dispatch(reset());
    });

    it("initializes with default state", () => {
        const state = store.getState();
        expect(state.count.value).toBe(0);
    });

    it("increments counter value", () => {
        store.dispatch(incrementByAmount(1));
        const state = store.getState();
        expect(state.count.value).toBe(1);
    });
});
