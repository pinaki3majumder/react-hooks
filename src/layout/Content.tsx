import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "../routes/router";
import Loader from "../components/Loader";

function Content() {
  return (
    <Suspense fallback={<Loader size="sm" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default Content;
