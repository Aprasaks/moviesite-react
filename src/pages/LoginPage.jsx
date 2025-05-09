import { useState } from "react";
import { Link } from "react-router-dom";
import InputCommon from "../components/InputCommon";

//우리가 아는대로 input 태그 이런걸 쓰는게아니라
//재사용가능한 컴포넌트를 만들고 그걸 가져오는방식
//이번 프로젝트에서 처음이라 잘 이해할 것
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //새로고침 방지하면서 유효성 검사 시작하자
  const handleSubmit = (e) => {
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

    if (valid) {
      // 로그인 API 호출 or 처리
      console.log("로그인 성공!");
    }
  };

  return (
    <div className="slide-in w-full max-w-md mx-auto p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
      <form onSubmit={handleSubmit}>
        <InputCommon
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <InputCommon
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800"
        >
          로그인
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        여기가 처음이니?{" "}
        <Link to="/signup" className="text-blue-500 underline">
          간편가입
        </Link>
      </div>
    </div>
  );
}
