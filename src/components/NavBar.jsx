// src/components/NavBar.jsx
export default function NavBar() {
  return (
    <nav className="w-full h-16 bg-black text-white flex justify-between items-center px-8">
      <h1 className="text-2xl font-bold">나랑 영화볼래?</h1>
      <div>
        <button className="mr-4">로그인</button>
      </div>
    </nav>
  );
}
