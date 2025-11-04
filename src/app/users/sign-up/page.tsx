"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { GoEye } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiEyeClosed } from "react-icons/pi";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 단계 상태
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 비밀번호 유효성 검사 (영문 포함 6자리 이상)
  const isValidPassword = (password: string) => /^(?=.*[A-Za-z]).{6,}$/.test(password);

  const isPasswordMatch = password === confirmPassword;
  const isPasswordValid = isValidPassword(password);

  // 현재 단계 (UI용)
  const currentStep = !isEmailSent ? 1 : isEmailSent && !isEmailVerified ? 2 : 3;

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
      setIsEmailSent(true);
      setIsEmailVerified(false);
    },
    onError: (error: any) => {
      setMessage(`Error: ${error.message}`);
      setErrorMessage(error.message);
      setIsEmailSent(false);
      setIsEmailVerified(false);
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
      setMessage(data.message || "Email verified successfully!");
      setErrorMessage("");
      setIsEmailVerified(true);
    },
    onError: (error: any) => {
      setMessage(`Error: ${error.message}`);
      setErrorMessage(error.message);
      setIsEmailVerified(false);
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
      router.push("/users/sign-in");
    },
    onError: (error: any) => {
      setMessage(`Error: ${error.message}`);
      setErrorMessage(error.message);
    },
  });

  const inputBase =
    "block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 " +
    "outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100";

  const labelBase = "mb-1.5 block text-sm font-medium text-slate-700";

  const sectionTitleBase = "mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 p-7 shadow-xl ring-1 ring-slate-900/5 backdrop-blur">
        {/* 헤더 */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Email 회원 가입하기</h1>
          <p className="mt-2 text-xs text-slate-500">이메일 인증 후 비밀번호를 설정하여 계정을 생성합니다.</p>
        </header>

        {/* 스텝 인디케이터 */}
        <ol className="mb-7 flex items-center justify-between text-xs font-medium text-slate-500">
          {[
            { step: 1, label: "이메일" },
            { step: 2, label: "인증코드" },
            { step: 3, label: "비밀번호" },
          ].map(({ step, label }, idx, arr) => {
            const active = currentStep === step;
            const done = currentStep > step;
            const last = idx === arr.length - 1;

            return (
              <li key={step} className="flex flex-1 items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={clsx("flex h-7 w-7 items-center justify-center rounded-full text-xs", {
                      "bg-blue-600 text-white shadow-sm": active,
                      "bg-emerald-500 text-white shadow-sm": done,
                      "bg-slate-200 text-slate-600": !active && !done,
                    })}>
                    {done ? "✓" : step}
                  </div>
                  <span
                    className={clsx("hidden text-[11px] md:inline", {
                      "text-blue-600": active,
                      "text-emerald-600": done,
                    })}>
                    {label}
                  </span>
                </div>
                {!last && <div className="mx-2 h-px flex-1 bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />}
              </li>
            );
          })}
        </ol>

        {/* STEP 1. 이메일 입력 */}
        <section className="mb-6 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <p className={sectionTitleBase}>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] text-white">1</span>
            이메일 입력하기
          </p>

          <label htmlFor="email" className={labelBase}>
            사용하실 이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailSent(false);
              setIsEmailVerified(false);
            }}
            className={inputBase}
          />

          <button
            type="button"
            onClick={() => sendVerification.mutate()}
            disabled={!isValidEmail(email) || sendVerification.isPending}
            className={clsx(
              "relative mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-medium text-white",
              "transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400",
            )}>
            {sendVerification.isPending && <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />}
            {sendVerification.isPending ? "인증 코드 보내는 중..." : isEmailSent ? "인증 코드 다시 보내기" : "이메일로 인증 코드 보내기"}
          </button>

          {isEmailSent && !isEmailVerified && (
            <p className="mt-2 text-xs text-slate-500">입력하신 이메일로 인증코드를 보냈습니다. 메일함을 확인해 주세요.</p>
          )}
          {isEmailVerified && <p className="mt-2 text-xs font-medium text-emerald-600">✓ 이메일 인증이 완료되었습니다.</p>}
          {errorMessage && <p className="mt-2 animate-pulse text-center text-sm font-semibold text-red-500">{errorMessage}</p>}
        </section>

        {/* STEP 2. 인증코드 입력 */}
        <section className="mb-6 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <p className={sectionTitleBase}>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] text-white">2</span>
            인증코드 입력하기
          </p>

          <fieldset disabled={!isEmailSent} className="space-y-2">
            <label htmlFor="token" className={labelBase}>
              이메일로 받은 인증코드
            </label>
            <input
              id="token"
              type="text"
              placeholder="6자리 인증코드"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className={inputBase}
            />

            <button
              type="button"
              onClick={() => validateCode.mutate()}
              disabled={!token || validateCode.isPending || !isEmailSent}
              className={clsx(
                "relative mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2.5 text-sm font-medium text-white",
                "transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300",
              )}>
              {validateCode.isPending && <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />}
              {validateCode.isPending ? "인증 중..." : "인증하기"}
            </button>
          </fieldset>

          {!isEmailSent && <p className="mt-2 text-xs text-slate-400">먼저 이메일을 입력하고 인증 코드를 보내주세요.</p>}
        </section>

        {/* STEP 3. 비밀번호 등록 */}
        <section className="mb-5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <p className={sectionTitleBase}>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[11px] text-white">3</span>
            비밀번호 등록하기
          </p>

          <fieldset disabled={!isEmailVerified}>
            <label htmlFor="password" className={labelBase}>
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="영문 포함 6자리 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputBase}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={clsx("absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 transition hover:text-slate-700", { hidden: !password })}>
                {showPassword ? <GoEye size={20} /> : <PiEyeClosed size={20} />}
              </button>
            </div>

            {!isPasswordValid && password && <p className="mt-1 text-xs text-red-500">비밀번호는 영문을 포함하여 6자리 이상이어야 합니다.</p>}

            <label htmlFor="confirmPassword" className={clsx(labelBase, "mt-4")}>
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 한번 더 입력"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputBase}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={clsx("absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 transition hover:text-slate-700", {
                  hidden: !password || !confirmPassword,
                })}>
                {showConfirmPassword ? <GoEye size={20} /> : <PiEyeClosed size={20} />}
              </button>
            </div>

            {password && confirmPassword && (
              <p
                className={clsx("mt-1 text-xs", {
                  "text-emerald-600": isPasswordMatch,
                  "animate-pulse text-red-500": !isPasswordMatch,
                })}>
                {isPasswordMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
              </p>
            )}
          </fieldset>

          {!isEmailVerified && <p className="mt-2 text-xs text-slate-400">이메일 인증이 완료되면 비밀번호를 설정할 수 있습니다.</p>}
        </section>

        {/* 회원가입 버튼 */}
        <div className="mb-3">
          <button
            type="button"
            disabled={!isEmailVerified || !isPasswordValid || !isPasswordMatch || registerUser.isPending}
            onClick={() => registerUser.mutate()}
            className={clsx(
              "flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm",
              "transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300",
            )}>
            {registerUser.isPending && <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />}
            {registerUser.isPending ? "회원 가입 중..." : "회원 가입 완료하기"}
          </button>
        </div>

        {/* 메시지 영역 */}
        {errorMessage && <p className="mb-1 text-center text-xs text-red-500">{errorMessage}</p>}
        {message && !message.startsWith("Error") && <p className="mb-1 text-center text-xs text-emerald-600">{message}</p>}

        {/* 하단 링크 */}
        <div
          className={clsx("mt-4 flex items-center justify-center gap-1 text-xs text-slate-500", {
            "pointer-events-none opacity-60": sendVerification.isPending || validateCode.isPending || registerUser.isPending,
          })}>
          <span>이미 계정이 있으신가요?</span>
          <Link href="/users/sign-in" className="font-medium text-slate-900 underline-offset-2 hover:underline">
            로그인하기
          </Link>
        </div>

        <div className="mt-3 text-center">
          <Link href="/public" className="text-[11px] text-slate-400 underline-offset-2 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
