import { memo } from "react";

interface SearchProps {
  onDeck: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Search({ onDeck }: SearchProps) {
  return <input type="text" onKeyUp={onDeck} />;
}

export default memo(Search);
