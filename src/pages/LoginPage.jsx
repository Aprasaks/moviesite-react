import { useState } from "react";
import InputCommon from "../components/InputCommon";
import { useSupabaseAuth } from "../supabase/";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage({ setUser }) {
  // ⭐ setUser props 추가
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useSupabaseAuth();
  const { loginWithGoogle, loginWithKakao } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!email.includes("@")) {
      setEmailError("올바른 이메일 형식으로 입력해주세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      const userInfo = await login({ email, password }); // ⭐ login 결과 받아옴
      setUser(userInfo.user); // ⭐ 로그인 성공 시 App의 user 상태 업데이트
      alert("로그인 성공!");
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
      <form onSubmit={handleSubmit}>
        <InputCommon
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          placeholder="이메일을 입력하세요"
        />
        <InputCommon
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          placeholder="비밀번호를 입력하세요"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800"
        >
          로그인
        </button>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="w-full bg-red-500 text-white  py-2 rounded hover:bg-red-600"
          >
            Google로 가입하기
          </button>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => loginWithKakao()}
            className="w-full bg-yellow-300 text-black  py-2 rounded hover:bg-yellow-400"
          >
            KakaoTalk으로 가입하기
          </button>
        </div>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        회원이 아니신가요?
        <Link to="/signup" className="text-blue-900 underline">
          간편가입
        </Link>
      </p>
    </div>
  );
}
