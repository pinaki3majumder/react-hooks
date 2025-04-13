import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: 0;
};

const initialState: InitialState = {
  value: 0,
};

export const counter = createSlice({
  name: "simple-counter",
  initialState,
  reducers: {
    plus: (state) => {
      state.value += 1;
    },
    minus: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
    incrementByAmount: (state, actions: PayloadAction<number>) => {
      state.value += actions.payload;
    },
  },
});

export const { plus, minus, reset, incrementByAmount } = counter.actions;
export const counterReducer = counter.reducer;
