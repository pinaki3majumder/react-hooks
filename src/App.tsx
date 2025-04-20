import { useSelector } from "react-redux";
import FlexContainer from "./components/FlexContainer";
import { RootState } from "./redux/store";

function App() {
  const isLoading = useSelector((state: RootState) => state.count.isLoading);

  return <>{!isLoading ? <FlexContainer /> : <h1>Loading...</h1>}</>;
}

export default App;
