// API call for list of movies
export interface MovieType {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

// watched
export interface WatchedMovieType extends IMovieDetails {
  userRating: number;
}

// API call for individual movies
export interface IMovieDetails {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Plot: string;
  Poster: string;
  Released: string;
  Runtime: string;
  Title: string;
  Website: string;
  Year: string;
  imdbID: string;
  imdbRating: number;
}
