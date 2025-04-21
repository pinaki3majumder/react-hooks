import { createBrowserRouter } from "react-router";
import FlexContainer from "../components/Counter/FlexContainer";
import Home from "../components/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/counter",
    element: <FlexContainer />,
  },
  {
    path: "*",
    element: <h1>Error</h1>,
  },
]);
