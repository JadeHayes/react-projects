import Logo from "./Logo";
import Search from "./Search";
import { MovieType } from "./types";

type NavBarProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  movies: MovieType[];
};

const NavBar: React.FC<NavBarProps> = ({ setQuery, query, movies }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search setQuery={setQuery} query={query} />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
};

export default NavBar;
