import NavBar from "./NavBar";
import MovieSlider from "./MovieSlider";
import { Outlet } from "react-router-dom";

export default function Layout({ movies }) {
  return (
    <>
      <NavBar />
      <MovieSlider movies={movies} />
      <main className="p-8">
        <Outlet />
      </main>
    </>
  );
}
