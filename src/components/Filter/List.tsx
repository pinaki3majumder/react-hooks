import { useCallback, useState } from "react";
import Search from "./Search";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation } from "react-router";

function List() {
  const style = {
    display: "flex",
    gap: "50px",
  };

  const location = useLocation();
  const { pathname } = location;

  const [originalStateList] = useState([
    "West Bengal",
    "Mumbai",
    "Delhi",
    "Tamil Nadu",
  ]); // Store the original list

  const [stateList, setStateList] = useState([...originalStateList]);

  const counterVal = useSelector((state: RootState) => state.count.value);

  const shuffle = () => {
    setStateList((prevState) => {
      if (prevState.length < 2) return prevState;

      const shuffled = [...prevState];
      do {
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
      } while (shuffled.join() === prevState.join()); // retry if same

      return shuffled;
    });
  };

  const filterList = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        const searchQuery = target.value.toLowerCase();
        if (!searchQuery) {
          setStateList(originalStateList); // Reset to the original list when the input is empty
        } else {
          setStateList(
            originalStateList.filter((text) =>
              text.toLowerCase().includes(searchQuery)
            )
          );
        }
      }
    },
    [originalStateList] // Depend only on the original list
  );

  return (
    <>
      {pathname}

      <br />
      <br />
      <div style={style}>
        <button
          onClick={shuffle}
          disabled={stateList.length <= 1}
          style={{
            cursor: stateList.length <= 1 ? "not-allowed" : "pointer",
          }}
        >
          SHUFFLE LIST {pathname !== "/cb" && "(" + counterVal + ")"}
        </button>
        <Search onDeck={filterList} />
      </div>
      <ul>
        {stateList.length ? (
          stateList.map((item) => <li key={item}>{item}</li>)
        ) : (
          <span>NOT FOUND</span>
        )}
      </ul>
    </>
  );
}

export default List;
