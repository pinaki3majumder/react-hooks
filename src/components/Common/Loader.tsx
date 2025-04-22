import { JSX } from "react";

const Loader = ({ size }: { size?: "sm" | "md" | "lg" }) => {
  let HeadingTag: keyof JSX.IntrinsicElements = "h1"; // Default to <h1>

  // Determine the heading tag based on the size prop
  switch (size) {
    case "lg":
      HeadingTag = "h1";
      break;
    case "md":
      HeadingTag = "h2";
      break;
    case "sm":
      HeadingTag = "h3";
      break;
    default:
      break;
  }

  return <HeadingTag>Loading...</HeadingTag>;
};

export default Loader;
