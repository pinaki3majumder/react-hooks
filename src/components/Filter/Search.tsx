import { memo } from "react";

interface SearchProps {
  onDeck: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Search({ onDeck }: SearchProps) {
  console.log("Search COMP INIT----------------");

  return <input type="text" onKeyUp={onDeck} />;
}

export default memo(Search);
