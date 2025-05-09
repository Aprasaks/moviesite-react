import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  useEffect(() => {
    const query = searchParams.get("query");
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}`
      : "https://api.themoviedb.org/3/movie/popular";

    fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const bannedKeywords = [
          "xxx",
          "porn",
          "erotic",
          "sex",
          "adult",
          "섹스",
          "야동",
          "포르노",
          "에로",
          "노출",
        ];

        const filteredMovies = data.results.filter(
          (movie) =>
            !movie.adult &&
            !bannedKeywords.some(
              (keyword) =>
                (movie.title || "").toLowerCase().includes(keyword) ||
                (movie.overview || "").toLowerCase().includes(keyword)
            )
        );

        setMovies(filteredMovies);
      });
  }, [API_TOKEN, searchParams]);

  return (
    <Routes>
      <Route path="/" element={<Layout movies={movies} user={user} setUser={setUser} />}>
        <Route
          index
          element={
            <div className="p-8 grid grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                />
              ))}
            </div>
          }
        />
        <Route path="details/:id" element={<MovieDetail />} />
        <Route path="login" element={<LoginPage setUser={setUser} />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}

export default App;
