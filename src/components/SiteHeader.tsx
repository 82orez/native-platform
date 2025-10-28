"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function SiteHeader() {
  const { status, data } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex h-16 items-center gap-3">
          {/* Left: Logo */}
          <div className="flex min-w-0 items-center">
            <Link href="/" className="flex items-center gap-2">
              {/* Replace with next/image if you have an actual logo file */}
              <span aria-hidden className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600" />
              <span className="truncate text-lg font-bold tracking-tight">Friending</span>
            </Link>
          </div>

          {/* Center: Nav + Search (desktop) */}
          <nav aria-label="주요 메뉴" className="mx-auto hidden min-w-0 flex-1 items-center justify-center md:flex">
            <ul className="flex flex-none items-center gap-6 text-sm font-medium">
              <li>
                <Link
                  href="/teachers"
                  className="rounded-sm px-1 py-0.5 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                  강사찾기
                </Link>
              </li>
              <li>
                <Link
                  href="/regions"
                  className="rounded-sm px-1 py-0.5 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                  지역별
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="rounded-sm px-1 py-0.5 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                  요금제
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="rounded-sm px-1 py-0.5 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                  소개
                </Link>
              </li>
            </ul>

            {/* Separator */}
            <div className="mx-6 hidden h-6 w-px bg-gray-200 md:block" aria-hidden />

            {/* Search */}
            <form action="/search" role="search" className="relative w-full max-w-md">
              <label htmlFor="q" className="sr-only">
                강사/지역/키워드 검색
              </label>
              <input
                id="q"
                name="q"
                type="search"
                placeholder="강사, 지역, 수업 형태 검색…"
                className="w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-2 pr-10 text-sm shadow-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <button
                aria-label="검색"
                className="absolute top-1.5 right-1.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-300 bg-white/70 text-gray-600 hover:bg-gray-100 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
                </svg>
              </button>
            </form>
          </nav>

          {/* Right: Auth / My page */}
          {status === "authenticated" && (
            <div>
              <Link
                href="/mypage"
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                마이페이지
              </Link>
              <button
                className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
                onClick={() => {
                  // * 로그아웃 이후 redirect 할 경로설정.
                  signOut({ callbackUrl: "/" });
                }}>
                로그아웃
              </button>
            </div>
          )}

          {status === "unauthenticated" && (
            <div className="ml-auto hidden items-center gap-2 md:flex">
              {/* Auth buttons are placeholders; wire up to your auth logic */}
              <Link
                href="/users/sign-in"
                className="w-[75px] rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                로그인
              </Link>

              <Link
                href="/users/sign-up/choice"
                className="w-[75px] rounded-lg bg-gray-200 px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none">
                회원가입
              </Link>
            </div>
          )}

          {/* Mobile: menu & search */}
          <div className="ml-auto flex flex-1 items-center justify-end gap-2 md:hidden">
            <form action="/search" role="search" className="flex-1">
              <label htmlFor="mq" className="sr-only">
                검색
              </label>
              <input
                id="mq"
                name="q"
                type="search"
                placeholder="강사/지역 검색"
                className="w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500"
              />
            </form>
            <details className="relative">
              <summary className="list-none rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm font-medium shadow-sm active:scale-95">
                메뉴
              </summary>
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                <Link href="/teachers" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  강사찾기
                </Link>
                <Link href="/regions" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  지역별
                </Link>
                <Link href="/pricing" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  요금제
                </Link>
                <Link href="/about" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  소개
                </Link>
                <div className="my-2 h-px bg-gray-200" />
                <Link href="/mypage" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  마이페이지
                </Link>
                <Link href="/auth/signin" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  로그인
                </Link>
                <Link href="/auth/signout" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  로그아웃
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
