import { useState } from "react";
import InputCommon from "../components/InputCommon";
import { useSupabaseAuth } from "../supabase/auth";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { signUp } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!email.includes("@")) {
      setEmailError("이메일 형식으로 작성해주세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!/[a-zA-Z가-힣0-9]{2,8}/.test(name)) {
      setNameError("이름을 입력해주세요.");
      valid = false;
    } else {
      setNameError("");
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      setPasswordError("영문 대문자/소문자 + 숫자의 조합 사용");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!valid) return;

    try {
      await signUp({ email, password, userName: name });
      alert("회원가입 성공!");
      navigate("/"); // 메인페이지 이동
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
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
          label="이름"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          placeholder="이름을 입력하세요"
        />
        <InputCommon
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          placeholder="비밀번호를 입력하세요"
        />
        <InputCommon
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          placeholder="비밀번호를 다시 입력하세요"
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
