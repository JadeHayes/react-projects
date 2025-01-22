import { SetStateAction } from "react";
import { WatchedMovieType } from "./types";

interface WatchedMoviesProps {
  watched: WatchedMovieType[];
  setWatched: React.Dispatch<SetStateAction<WatchedMovieType[]>>;
}

const WatchedMovies: React.FC<WatchedMoviesProps> = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.Runtime}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WatchedMovies;
