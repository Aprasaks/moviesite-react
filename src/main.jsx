import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SupabaseProvider } from "../src/supabase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </BrowserRouter>
  </StrictMode>
);

// - `main.js`에서 제공받은 파일 내 `SupabaseProvider`를 `import`합니다.
// - `main.js`에 작성되어 있는 `<App/>` 컴포넌트를 감싸줍니다.

// SupabaseProvider는 context안에 index.js안에 있다.
