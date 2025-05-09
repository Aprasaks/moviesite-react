import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false); // 로그아웃할 때 메뉴 닫기
  };

  return (
    <nav className="w-full h-16 bg-black text-white flex justify-between items-center px-8">
      <h1 className="text-2xl font-bold">나랑 영화볼래?</h1>

      <input
        type="text"
        placeholder="검색하려면 누르세요"
        className="w-1/2 rounded-full px-4 py-2 text-black focus:outline-none"
      />

      <div>
        {isLoggedIn ? (
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)} // 클릭시 토글
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
          <Link
            to="#"
            onClick={() => setIsLoggedIn(true)} // 임시 로그인 처리
            className="ml-4"
          >
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
