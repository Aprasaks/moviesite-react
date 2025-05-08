import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";

function App() {
  const [movies, setMovies] = useState([]);
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  });

  return (
    <Routes>
      {/* 공통 Layout */}
      <Route path="/" element={<Layout movies={movies} />}>
        {/* 메인 페이지 */}
        <Route
          index
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
        <Route path="details" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
