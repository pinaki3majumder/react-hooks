import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: 0;
};

const initialState: InitialState = {
  value: 0,
};

const counter = createSlice({
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
  extraReducers(builder) {
    builder
      .addCase(incremnentAsync.pending, () => {
        console.log("--pending--");
      })
      .addCase(
        incremnentAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }
      );
  },
});

export const incremnentAsync = createAsyncThunk(
  "counter/async",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return amount;
  }
);

export const { plus, minus, reset, incrementByAmount } = counter.actions;
export const counterReducer = counter.reducer;
