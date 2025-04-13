import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { incrementByAmount, minus, plus, reset } from "../redux/slices/counter";
import React, { useState } from "react";

function Counter() {
  const counterVal = useSelector((state: RootState) => state.count.value);
  const dispatch = useDispatch();
  const [incrementVal, setIncrementVal] = useState(2);

  return (
    <>
      <div>COUNTER: {counterVal}</div>
      <br />
      <br />
      <button onClick={() => dispatch(plus())}>+</button>
      <button onClick={() => dispatch(reset())}>RESET</button>
      <button onClick={() => dispatch(minus())}>-</button>
      <br />
      <br />
      <input
        type="number"
        value={incrementVal}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setIncrementVal(Number(e.target.value))
        }
      />
      <button onClick={() => dispatch(incrementByAmount(incrementVal))}>
        INCREMENT BY NUMBER
      </button>
    </>
  );
}

export default Counter;
