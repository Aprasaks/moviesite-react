import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id, API_TOKEN]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-gray-500"></div>
      </div>
    );
  }

  const { backdrop_path, title, vote_average, genres, overview } = movie;

  return (
    <div className="flex p-4">
      <img src={`${baseUrl}${backdrop_path}`} alt={title} className="w-1/2 rounded-lg" />
      <div className="ml-4 text-black">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg">평점: {vote_average}</p>
        <p className="mt-2">장르: {genres.map((g) => g.name).join(", ")}</p>
        <p className="mt-4">{overview}</p>
      </div>
    </div>
  );
}
