import NavBar from "./NavBar";
import MovieSlider from "./MovieSlider";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout({ movies, user, setUser }) {
  const location = useLocation();
  const hideSliderRoutes = ["/login", "/signup"];
  const isDetailsPage = location.pathname.startsWith("/details");
  const hideSlider = hideSliderRoutes.includes(location.pathname) || isDetailsPage;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      {!hideSlider && <MovieSlider movies={movies} />}
      <main className="p-8">
        <Outlet />
      </main>
    </>
  );
}
