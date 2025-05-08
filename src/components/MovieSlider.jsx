// src/components/MovieSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieSlider({ movies }) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-4">팝콘 준비하자!</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <img
              src={baseUrl + movie.poster_path}
              alt={movie.title}
              className="rounded-lg shadow-lg"
            />
            <p className="text-center mt-2">{movie.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
