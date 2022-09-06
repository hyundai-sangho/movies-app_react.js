import { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1c17a20b7447589ceae416940a866a8f&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=1c17a20b7447589ceae416940a866a8f&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    async function fetchData() {
      const movieResp = await fetch(API);
      const moviesR = await movieResp.json();

      setMovies(moviesR.results);
    }
    fetchData();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input className="search" type="search" placeholder="검색" value={searchTerm} onChange={handleOnChange} />
        </form>
      </header>
      <div className="movie-container">{movies.length > 0 && movies.map((영화) => <Movie key={영화.id} {...영화} />)}</div>
    </>
  );
}

export default App;
