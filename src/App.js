import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import Popcoorn from "./img/netflix.svg";

const API_URL = `https://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

const App = function () {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies("film");
  }, []);

  return (
    <>
      {/* <div class="header-logo">
        <h1>W</h1>
        <img src={WOS} alt="logo" />
        <h1>S</h1>
      </div> */}
      <div className="app">
        <div className="title">
          <h1>Lulu Movies</h1>
          <img src={Popcoorn} alt="popcorn " />
        </div>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? searchMovies(searchTerm) : {}
            }
          />
          <img
            src={SearchIcon}
            alt="Search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
        {movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
            ;
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
