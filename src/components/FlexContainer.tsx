import React from "react";
import Counter from "./Counter";
import List from "./Filter/List";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function FlexContainer() {
  const containerStyle = {
    display: "flex",
    flexWrap: "nowrap",
    backgroundColor: "DodgerBlue",
  };

  const itemStyle = {
    padding: "10px",
    backgroundColor: "#f1f1f1",
    margin: "10px",
    textAlign: "center",
  };

  const counterVal = useSelector((state: RootState) => state.count.value);

  return (
    <div style={containerStyle}>
      <div style={itemStyle}>
        <List />
      </div>
      <div style={itemStyle}>
        <Counter />
      </div>
      <div style={itemStyle}>{counterVal}</div>
    </div>
  );
}

export default FlexContainer;
