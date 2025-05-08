import { useState, useEffect } from "react";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch("/movieDetailData.json")
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  if (!movie) {
    return <div>로딩중...</div>;
  }

  const { backdrop_path, title, vote_average, genres, overview } = movie;

  return (
    <div className="flex p-4">
      <img src={baseUrl + backdrop_path} alt={title} className="w-1/2 rounded-lg" />
      <div className="ml-4 text-black">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg">평점: {vote_average}</p>
        <p className="mt-2">장르: {genres.map((g) => g.name).join(", ")}</p>
        <p className="mt-4">{overview}</p>
      </div>
    </div>
  );
}
