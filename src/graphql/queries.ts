import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
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
