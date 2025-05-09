import { useState } from "react";
import InputCommon from "../components/InputCommon";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email.includes("@")) {
      setEmailError("이메일 형식으로 작성해주세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!/^[a-zA-Z가-힣0-9]{2,8}$/.test(name)) {
      setNameError("이름은 2~8자, 한글/영어/숫자만 사용");
      valid = false;
    } else {
      setNameError("");
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password)) {
      setPasswordError("영문+숫자 조합 8자 이상");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않아요.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (valid) {
      console.log("회원가입 성공!");
      // supabase 로직 나중에 추가
    }
  };

  return (
    <div className="slide-in w-full max-w-md mx-auto p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <InputCommon
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <InputCommon
          label="이름"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
        />
        <InputCommon
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        <InputCommon
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
