interface SearchProps {
  setQuery: (query: string) => void;
  query: string;
}

const Search: React.FC<SearchProps> = ({ setQuery, query }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
