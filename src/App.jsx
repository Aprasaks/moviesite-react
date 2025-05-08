import "./App.css";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movieListData.json")
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  return (
    <div className="p-8 grid grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
          vote_average={movie.vote_average}
        />
      ))}
    </div>
  );
}

export default App;
