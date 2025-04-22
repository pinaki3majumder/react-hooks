import Counter from "./Counter";
import List from "../Filter/List";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../Common/Loader";

function FlexContainer() {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "nowrap",
    backgroundColor: "DodgerBlue",
  };

  const itemStyle: React.CSSProperties = {
    padding: "10px",
    backgroundColor: "#f1f1f1",
    margin: "10px",
    textAlign: "center",
  };

  const counterVal = useSelector((state: RootState) => state.count.value);

  const isLoading = useSelector((state: RootState) => state.count.isLoading);

  return (
    <>
      {!isLoading ? (
        <div style={containerStyle}>
          <div style={itemStyle}>
            <List />
          </div>
          <div style={itemStyle}>
            <Counter />
          </div>
          <div style={itemStyle}>{counterVal}</div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FlexContainer;
