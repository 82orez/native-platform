import Link from "next/link";

export default function SignupChoicePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">회원가입 유형 선택</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">아래에서 해당하는 유형을 선택해 주세요.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2" role="list" aria-label="회원가입 유형 목록">
          {/* 일반인 카드 */}
          <Link
            href="/users/sign-up/teacher"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-800 dark:bg-gray-900"
            aria-label="일반인 회원가입 선택">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition group-hover:scale-105 dark:border-gray-800 dark:bg-gray-800">
                {/* Person icon (inline SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-gray-700 dark:text-gray-200"
                  aria-hidden>
                  <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6Zm0 2c-5.523 0-10 3.582-10 8 0 .552.448 1 1 1h18c.552 0 1-.448 1-1 0-4.418-4.477-8-10-8Z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold">Teacher</h2>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">원어민 강사를 위한 표준 회원가입.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3">
                  계속하기
                  <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* 문화센터 카드 */}
          <Link
            href="/signup/center"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-800 dark:bg-gray-900"
            aria-label="문화센터 회원가입 선택">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition group-hover:scale-105 dark:border-gray-800 dark:bg-gray-800">
                {/* Building icon (inline SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-gray-700 dark:text-gray-200"
                  aria-hidden>
                  <path d="M3 22a1 1 0 0 1-1-1V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v2h5a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H3Zm1-2h7V4H4v16Zm9 0h6V8h-6v12ZM6 7h3V5H6v2Zm0 4h3V9H6v2Zm0 4h3v-2H6v2Zm9-6h3V9h-3v2Zm0 4h3v-2h-3v2Zm0 4h3v-2h-3v2Z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold">문화센터</h2>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                  기관/단체(문화센터, 학원, 평생교육원 등) 관리자용 회원가입.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3">
                  계속하기
                  <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-10 text-center text-sm text-gray-600 dark:text-gray-300">
          <span>이미 계정이 있나요? </span>
          <Link href="/login" className="font-medium text-blue-600 underline-offset-2 hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}
