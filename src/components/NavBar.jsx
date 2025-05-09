import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./hooks/useDebounce";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setSearchParams] = useSearchParams();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 디바운스된 검색어를 URL query에 반영
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchParams({ query: debouncedSearchTerm });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchTerm, setSearchParams]);

  return (
    <nav className="w-full h-16 bg-black text-white flex justify-between items-center px-8">
      <h1 className="text-2xl font-bold">나랑 영화볼래?</h1>

      <input
        type="text"
        placeholder="검색하려면 누르세요"
        className="w-1/2 rounded-full px-4 py-2 text-black focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <Link to="/login" className="ml-4">
          로그인
        </Link>
      </div>
    </nav>
  );
}
