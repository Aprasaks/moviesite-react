import { useNavigate } from "react-router-dom";

export default function MovieCard({ id, poster_path, title, vote_average }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/details/${id}`)} className="cursor-pointer shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="rounded-lg"
      />
      <h3 className="mt-2 font-bold">{title}</h3>
      <p className="text-sm text-gray-500">평점: {vote_average}</p>
    </div>
  );
}
