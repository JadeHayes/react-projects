import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { IMovieDetails, WatchedMovieType } from "./types";

// TODO: move key in parent app
const KEY = "3291b92";

interface SelectedMovieProps {
  id: string | null;
  onHandleSelectId: (id: string | null) => void;
  onHandleAddWatched: (movie: WatchedMovieType) => void;
}

const MovieDetails: React.FC<SelectedMovieProps> = ({
  id,
  onHandleAddWatched,
  onHandleSelectId: handleSelectId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieDetails, setMovieDetails] = useState<WatchedMovieType | null>();
  const [userRating, setUserRating] = useState(0);

  const handleSelectedMovie = async (MovieId: string) => {
    try {
      setLoading(true);
      const ombdMovieUri = `http://www.omdbapi.com/?apikey=${KEY}&i=${MovieId}`;

      const response = await fetch(ombdMovieUri);

      if (!response.ok) {
        throw new Error("Error fetching movie details");
      }

      const data = await response.json();
      setMovieDetails(data);
      await console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      setError("");
    }
  };

  useEffect(() => {
    id && handleSelectedMovie(id);
  }, [id]);

  const handleCloseMovie = () => {
    handleSelectId(null);
  };

  const handleAddWatched = (movie: WatchedMovieType) => {
    onHandleAddWatched({ ...movie, userRating });
    handleCloseMovie();
  };

  return (
    <div className="details">
      {loading && <div> 🌊 loading 🌊 </div>}
      {error && <div className="error">{error}</div>}
      {movieDetails && (
        <>
          <header>
            <button onClick={handleCloseMovie} className="btn-back">
              &larr;
            </button>
            <img src={movieDetails.Poster} alt={movieDetails.Title} />
            <div className="details-overview">
              <h2>{movieDetails.Title}</h2>
              <p>
                {movieDetails.Released} &bull; {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Genre}</p>
              <p> {movieDetails.imdbRating}</p>
              <p>
                <span>⭐️</span>
                {movieDetails.imdbRating} imbd rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <Rating
                value={10}
                size={24}
                userRating={userRating}
                handleUserRating={setUserRating}
              />
              <button
                className="btn-add"
                onClick={() => handleAddWatched(movieDetails)}
              >
                + Add to list
              </button>
            </div>
            <p>
              <em>{movieDetails.Plot}</em>
            </p>
            <p>Starring {movieDetails.Actors}</p>
            <p>Directed By {movieDetails.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
