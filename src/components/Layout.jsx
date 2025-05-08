// src/components/Layout.jsx
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="p-8">
        <Outlet />
      </main>
    </>
  );
}
