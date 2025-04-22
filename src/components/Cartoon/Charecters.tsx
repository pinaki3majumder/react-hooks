import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import SkeletonCard from "../Common/Skeleton/SkeletonCard";

interface CharacterType {
  name: string;
  image: string;
  gender: string;
  id: string;
}
const FILTER_OPTIONS = ["All", "Male", "Female"];

const filterStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
};

const GET_CHARACTERS = gql`
  query GetCharacters($gender: String) {
    characters(filter: { gender: $gender }) {
      results {
        id
        name
        image
        gender
      }
    }
  }
`;

function Charecters() {
  const [charactersData, setCharactersData] = useState<CharacterType[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [loadingImages, setLoadingImages] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(0); // 🔄 For showing placeholders

  const [loadCharacters, { data, loading, error }] = useLazyQuery(
    GET_CHARACTERS,
    {
      fetchPolicy: "network-only",
    }
  );

  // Load all characters on initial page load
  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  // Update characters data when query returns
  useEffect(() => {
    if (data?.characters?.results) {
      //   setCharactersData([...data.characters.results]);

      const results = data.characters.results;
      setCharactersData([]);
      setSkeletonCount(results.length); // 🔄 Set placeholder count
      setLoadingImages(true);

      let loadedImages = 0;
      const total = results.length;

      results.forEach((char: CharacterType) => {
        const img = new Image();
        img.src = char.image;
        img.onload = img.onerror = () => {
          loadedImages++;
          if (loadedImages === total) {
            setCharactersData(results);
            setLoadingImages(false);
          }
        };
      });
    }
  }, [data]);

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filterVal = e.currentTarget.value;
    setCharactersData([]); // Clear existing data while loading
    setActiveFilter(filterVal);

    if (filterVal === "All") {
      loadCharacters(); // No gender filter
    } else {
      loadCharacters({ variables: { gender: filterVal } });
    }
  };

  const isLoading = loading || loadingImages;

  return (
    <>
      {error && <h1>Error fetching characters!</h1>}

      <div style={filterStyle}>
        <h2>Filter:</h2>

        {FILTER_OPTIONS.map((val) => {
          const isSelected = activeFilter === val;
          const allButtonsDisabled = loading || loadingImages; // ✅ Add this

          return (
            <button
              key={val}
              value={val}
              onClick={handleFilter}
              disabled={isSelected || allButtonsDisabled} // ✅ Combine both conditions
              style={{
                padding: "6px 12px",
                border: "1px solid gray",
                borderRadius: "6px",
                backgroundColor: isSelected ? "#007BFF" : "#f1f1f1",
                color: isSelected ? "white" : "black",
                fontWeight: isSelected ? "bold" : "normal",
                cursor: allButtonsDisabled ? "not-allowed" : "pointer", // ✅ cursor logic
                opacity: isSelected || allButtonsDisabled ? 0.6 : 1,
              }}
            >
              {val}
            </button>
          );
        })}
      </div>

      {/* Cards Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
          justifyContent: "space-around",
        }}
      >
        {/* Skeletons */}
        {isLoading && <SkeletonCard count={skeletonCount} />}

        {/* Actual Data */}
        {!isLoading &&
          charactersData.map((character) => (
            <div key={character.id}>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default Charecters;
