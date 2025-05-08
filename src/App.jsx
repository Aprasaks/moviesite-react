import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movieListData.json")
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route
        path="/"
        element={
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
        }
      />

      {/* 상세 페이지 */}
      <Route path="/details" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
