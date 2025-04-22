import { createBrowserRouter } from "react-router";
import FlexContainer from "../components/Counter/FlexContainer";
import Home from "../components/Home";
import List from "../components/Filter/List";
import Charecters from "../components/Cartoon/Charecters";

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
    path: "/cb",
    element: <List />,
  },
  {
    path: "/gql",
    children: [
      {
        path: "rickandmorty",
        element: <Charecters />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>NOT FOUND</h1>,
  },
]);
