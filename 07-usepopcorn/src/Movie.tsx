import React from "react";
import { MovieType } from "./types";

interface MovieProps {
  movie: MovieType;
  handleSelectId: (id: string | null) => void;
}

const Movie: React.FC<MovieProps> = ({ movie, handleSelectId }) => {
  return (
    <li key={movie.imdbID} onClick={() => handleSelectId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
