import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSupabaseAuth } from "../supabase/auth";
import { localStorageUtils } from "../supabase/utilities";
import { USER_INFO_KEY } from "../supabase/utilities/config";
import useDebounce from "../components/hooks/useDebounce";

export default function NavBar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useSupabaseAuth();
  const debouncedSearch = useDebounce(searchInput, 500);

  // ✅ 새로고침 시 user 복원
  useEffect(() => {
    const { getItemFromLocalStorage } = localStorageUtils();
    const storedUser = getItemFromLocalStorage(USER_INFO_KEY.customKey);
    if (storedUser?.user) setUser(storedUser.user);
  }, [setUser]);

  // ✅ 검색 → /login, /signup 제외하고만 동작
  useEffect(() => {
    const isAuthPage =
      location.pathname.startsWith("/login") || location.pathname.startsWith("/signup");

    if (!isAuthPage) {
      if (debouncedSearch) {
        navigate(`/?query=${encodeURIComponent(debouncedSearch)}`);
      } else {
        navigate("/");
      }
    }
  }, [debouncedSearch, navigate, location.pathname]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full h-16 bg-black text-white flex justify-between items-center px-8">
      <h1 className="text-2xl font-bold">나랑 영화볼래?</h1>

      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="검색하려면 누르세요"
        className="w-1/2 rounded-full px-4 py-2 text-black focus:outline-none"
      />

      <div>
        {user ? (
          <div className="relative">
            <img
              src={user.profileImageUrl}
              alt="프로필"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white text-black rounded shadow z-50">
                <Link
                  to="/mypage"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="ml-4">
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
