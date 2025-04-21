import { Link } from "react-router";

function Home() {
  return (
    <div>
      <h1>Topics :</h1>
      <ul>
        <li>
          <h3>
            <Link to="/counter">Counter</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link to="/gql">GRAPHQL API</Link>
          </h3>
        </li>
      </ul>
    </div>
  );
}

export default Home;
