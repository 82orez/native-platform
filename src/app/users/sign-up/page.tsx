"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { GoEye } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiEyeClosed } from "react-icons/pi";
import { BiSolidMessageRounded } from "react-icons/bi";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();

  const [step, setStep] = useState<"inputEmail" | "verifyCode" | "inputPassword">("inputEmail");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 입력 상태 추가
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 비밀번호 유효성 검사 (영문 포함 6자리 이상)
  const isValidPassword = (password: string) => /^(?=.*[A-Za-z]).{6,}$/.test(password);

  const isPasswordMatch = password === confirmPassword; // 비밀번호 일치 여부 확인
  const isPasswordValid = isValidPassword(password); // 비밀번호 유효성 확인

  const sendVerification = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "오류가 발생했습니다.");
      }
      return data;
    },
    onSuccess: (data) => {
      setMessage(data.message || "Verification code sent to email.");
      setErrorMessage("");
      setStep("verifyCode");
    },
    onError: (error: any) => {
      setMessage(`Error: ${error.message}`);
      setErrorMessage(error.message);
    },
  });

  const validateCode = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/validate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired token.");
      }
      return data;
    },
    onSuccess: (data) => {
      setStep("inputPassword");
      setMessage(data.message || "Email verified successfully!");
      setErrorMessage("");
    },
    onError: (error: any) => {
      setMessage(`Error: ${error.message}`);
      setErrorMessage(`${error.message}`);
    },
  });

  const registerUser = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    },
    onSuccess: (data) => {
      setMessage(data.message || "Registration successful!");
      setErrorMessage("");
      alert(`${data.message} 로그인 페이지로 이동합니다.`);
      // * 회원 가입에 성공하면 이동할 page
      router.push("/users/sign-in");
    },
    onError: (error: any) => {
      setMessage(`Error: ${error.message}`);
      setErrorMessage(`${error.message}`);
    },
  });

  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const handleClickKakao = async () => {
    setIsKakaoLoading(true);
    await signIn("kakao", { callbackUrl: "/" });
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-[375px] rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-8 text-2xl font-semibold">회원 가입하기</h1>

      {/*단계별 진행 바 (Progress Indicator)*/}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                step === "inputEmail" ? "bg-blue-600 text-white" : "bg-green-600 text-white",
              )}>
              1
            </div>
            <span className="mt-2 text-center text-xs">
              이메일
              <br />
              입력
            </span>
          </div>

          {/* Progress Line 1 */}
          <div className={clsx("mx-2 h-0.5 flex-1", step === "verifyCode" || step === "inputPassword" ? "bg-green-600" : "bg-gray-300")}></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                step === "inputEmail" ? "bg-gray-300 text-gray-600" : step === "verifyCode" ? "bg-green-600 text-white" : "bg-green-600 text-white",
              )}>
              2
            </div>
            <span className="mt-2 text-center text-xs">
              이메일
              <br />
              인증
            </span>
          </div>

          {/* Progress Line 2 */}
          <div className={clsx("mx-2 h-0.5 flex-1", step === "inputPassword" ? "bg-green-600" : "bg-gray-300")}></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                step === "inputPassword" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600",
              )}>
              3
            </div>
            <span className="mt-2 text-center text-xs">
              비밀번호
              <br />
              설정
            </span>
          </div>
        </div>
      </div>

      {step === "inputEmail" ? (
        <>
          <p className={"mb-4 border-b-4 border-blue-400 pb-1 text-xl"}>Step 1. 이메일 입력하기</p>

          <label htmlFor="email" className="mb-2 block">
            사용하실 이메일을 입력해 주세요.
          </label>
          <input
            id="email"
            type="email"
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 block w-full border p-2"
          />
          <div className={"relative"}>
            <button
              onClick={() => sendVerification.mutate()}
              disabled={!isValidEmail(email) || sendVerification.isPending}
              // disabled={true}
              className={clsx("w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-400 disabled:opacity-80")}>
              {sendVerification.isPending ? "인증 코드 보내는 중..." : "이메일로 인증 코드 보내기"}
            </button>
            {sendVerification.isPending && <AiOutlineLoading3Quarters className={"absolute top-3.5 left-10 animate-spin md:left-11"} />}
          </div>
        </>
      ) : step === "verifyCode" ? (
        <>
          <p className={"mb-4 border-b-4 border-green-400 pb-1 text-xl"}>Step 2. 인증코드 입력하기</p>

          <div className={clsx("", { hidden: !message || message === "Error: 이미 가입된 이메일입니다." })}>
            <label htmlFor="token" className="mt-2 mb-2 block">
              인증코드를 입력해 주세요.
            </label>
            <input
              id="token"
              type="text"
              placeholder="6자리 인증코드"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mb-1 block w-full border p-2"
            />
            <div className={"relative"}>
              <button
                onClick={() => validateCode.mutate()}
                disabled={!token || validateCode.isPending}
                className="mt-2 w-full rounded-md bg-green-600 p-2 text-white hover:bg-green-500 disabled:opacity-80">
                {validateCode.isPending ? "인증 중..." : "인증하기"}
              </button>
              {validateCode.isPending && <AiOutlineLoading3Quarters className={"absolute top-5 left-12 animate-spin"} />}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className={"mb-4 border-b-4 border-blue-400 pb-1 text-xl"}>Step 3. 비밀번호 등록하기</p>
          <label htmlFor="password" className="mb-1 block">
            비밀 번호를 입력해 주세요.
          </label>
          <div className={"relative"}>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // showPassword 상태에 따라 타입 변경
              placeholder="영문 포함 6자리 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3 block w-full border p-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={clsx("absolute top-2.5 right-3 text-gray-600 hover:text-gray-800", { hidden: !password })}>
              {showPassword ? <GoEye size={25} /> : <PiEyeClosed size={25} />}
            </button>
          </div>

          {!isPasswordValid && password && <p className="mb-3 text-red-500">비밀번호는 영문을 포함하여 6자리 이상이어야 합니다.</p>}

          <label htmlFor="confirmPassword" className="mb-1 block">
            비밀번호를 확인해 주세요.
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-3 block w-full border p-2"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={clsx("absolute top-2.5 right-3 text-gray-600 hover:text-gray-800", {
                hidden: !password || !confirmPassword,
              })}>
              {showConfirmPassword ? <GoEye size={25} /> : <PiEyeClosed size={25} />}
            </button>
          </div>

          <div className={clsx("", { hidden: !password || !confirmPassword })}>
            {!isPasswordMatch ? (
              <p className="mb-3 animate-pulse text-red-500">비밀번호가 일치하지 않습니다.</p>
            ) : (
              <p className="mb-3 text-green-500">비밀번호가 일치합니다.</p>
            )}
          </div>

          <div className={"relative"}>
            <button
              disabled={!isPasswordMatch || !isPasswordMatch || registerUser.isPending || !password || !confirmPassword}
              onClick={() => registerUser.mutate()}
              className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-400 disabled:opacity-80">
              {registerUser.isPending ? "회원 가입 중..." : "회원 가입 완료하기"}
            </button>
            {registerUser.isPending && <AiOutlineLoading3Quarters className={"absolute top-3.5 left-11 animate-spin md:left-12"} />}
          </div>
        </>
      )}

      {errorMessage && <p className="mt-2 animate-pulse text-center text-red-500">{errorMessage}</p>}
      {/*{message.startsWith("Error") && <p className={"mt-2 text-red-500"}>{message}</p>}*/}
      {/*{message && <p className={`mt-2 ${message.startsWith("Error") ? "text-red-500" : "text-green-500"}`}>{message}</p>}*/}

      <div className="my-10 flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="px-3 text-sm text-gray-500">또는 카카오로 시작하기</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <div className="">
        <button
          type="button"
          onClick={handleClickKakao}
          disabled={isKakaoLoading}
          className="flex w-full items-center rounded-md border bg-yellow-300 px-10 py-2 text-center font-semibold hover:bg-yellow-400 disabled:opacity-50 md:px-11">
          {isKakaoLoading ? <AiOutlineLoading3Quarters className={"animate-spin"} /> : <BiSolidMessageRounded size={22} />}
          <div className={"grow"} style={{ color: "rgba(0, 0, 0, 0.85)" }}>
            카카오로 시작하기
          </div>
        </button>
      </div>

      <div
        className={clsx("mt-20 flex justify-center hover:underline", {
          "pointer-events-none": sendVerification.isPending || validateCode.isPending || registerUser.isPending,
        })}>
        <Link href={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}
