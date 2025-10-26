import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600" />
              <span className="text-lg font-bold tracking-tight">TutorBridge</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">지역 기반 원어민 강의 매칭, 예약, 결제를 한 곳에서. 안전한 검증과 리뷰로 신뢰를 쌓습니다.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">회사</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-indigo-600">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-indigo-600">
                  채용
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-indigo-600">
                  보도자료
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">지원</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/help" className="hover:text-indigo-600">
                  도움말 센터
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-indigo-600">
                  안전 정책
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-600">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          {/* Teacher Apply CTA (required) */}
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <h3 className="text-base font-semibold text-indigo-900">원어민 강사 지원</h3>
            <p className="mt-2 text-sm text-indigo-900/80">
              영어(또는 기타 언어) 강사로 활동하고 싶으신가요? 이력서를 접수하시면 검토 후 연락드립니다.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                이력서 접수하기
              </Link>
              <Link
                href="/apply/guide"
                className="inline-flex items-center justify-center rounded-xl border border-indigo-300 bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                지원 가이드 보기
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 text-sm text-gray-600 sm:flex-row">
          <p>© {new Date().getFullYear()} TutorBridge. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap" className="hover:text-indigo-600">
              사이트맵
            </Link>
            <Link href="/status" className="hover:text-indigo-600">
              시스템 상태
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
