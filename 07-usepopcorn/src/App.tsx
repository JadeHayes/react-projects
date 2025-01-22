import { useEffect, useState } from "react";
import { IMovieDetails, MovieType, WatchedMovieType } from "./types";
import NavBar from "./NavBar";
import Movie from "./Movie";
import WatchedMovies from "./WatchedMovies";
import Box from "./Box";
import WatchedSummary from "./WatchedSummary";
import MovieDetails from "./MovieDetails";

// const tempWatchedData: WatchedMovieType[] = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "3291b92";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [watched, setWatched] = useState<WatchedMovieType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const ombdURI = `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
        const response = await fetch(ombdURI);

        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await response.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);

  const handleSelectId = (id: string | null) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleAddWatched = (movie: WatchedMovieType) => {
    setWatched((prevWatched) =>
      prevWatched.find((m) => m.imdbID === movie.imdbID)
        ? prevWatched
        : [...prevWatched, movie]
    );
  };

  return (
    <>
      <NavBar setQuery={setQuery} query={query} movies={movies} />
      <main className="main">
        <Box>
          {loading && <div>...LOADING</div>}
          {error ? (
            <div className="error">🚫 {error} </div>
          ) : (
            <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie
                  movie={movie}
                  key={movie.imdbID}
                  handleSelectId={handleSelectId}
                />
              ))}
            </ul>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onHandleSelectId={handleSelectId}
              onHandleAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} length={watched.length} />
              <WatchedMovies watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
