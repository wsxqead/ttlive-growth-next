"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * NOTE
 * - 라이트/파스텔 테마 변수 사용 (globals.css의 CSS 변수)
 * - hover/active가 어두운 배경이 아닌, 민트 파스텔 하이라이트로 변경
 * - 활성 경로는 === 대신 startsWith로 처리 (하위 경로도 활성)
 * - 접근성: aria-current 추가, 포커스 링 보강
 */
const links = [
  { href: "/", label: "프로필 & 요약" },
  { group: "등급" },
  { href: "/fan-lv", label: "Fan Lv (후원)" },
  { href: "/activity", label: "Activity Grade (활동)" },
  { group: "보상" },
  { href: "/titles", label: "칭호" },
  { href: "/badges", label: "배지" },
  { group: "진행" },
  { href: "/quests", label: "퀘스트" },
  { href: "/rankings", label: "랭킹" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="panel h-max">
      {links.map((l, i) =>
        l.group ? (
          <div
            key={i}
            className="px-2 pt-2 pb-1 text-[11px] uppercase tracking-wider text-muted"
          >
            {l.group}
          </div>
        ) : (
          <NavItem
            key={l.href}
            href={l.href}
            label={l.label}
            active={isActive(pathname, l.href)}
          />
        )
      )}
    </nav>
  );
}

function isActive(pathname, href) {
  // 루트는 정확히 일치, 나머지는 startsWith 로 하위 경로까지 활성
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavItem({ href, label, active }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "block w-full my-1 px-3 py-2 rounded-[12px] border transition",
        "outline-none focus-visible:ring-2 focus-visible:ring-[rgba(67,209,191,.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        active
          ? // ACTIVE: 은은한 민트 파스텔 배경 + 보더
            "border-[color:var(--line2)] bg-[color:var(--brand-soft)] shadow-[0_4px_14px_rgba(67,209,191,.18)]"
          : // HOVER: 밝은 민트 톤 하이라이트
            "border-transparent hover:bg-[#e8f9f6] hover:border-[#bfe9e2]",
      ].join(" ")}
      style={{
        // 텍스트 컬러는 기본 텍스트, 활성화 시 약간 진하게
        color: active ? "#166e64" : "var(--txt)",
      }}
    >
      {label}
    </Link>
  );
}
