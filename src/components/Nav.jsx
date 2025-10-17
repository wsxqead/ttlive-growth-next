"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "프로필 & 요약" },
  { href: "/titles/preview", label: "칭호 미리보기" },
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
    <nav
      className="flex flex-wrap items-center gap-1 md:gap-2 px-2 py-1"
      style={{
        borderBottom: "1px solid #e6d38a",
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(6px)",
      }}
    >
      {links.map((l, i) =>
        l.group ? (
          <span
            key={i}
            className="text-[11px] uppercase tracking-wider text-muted px-2 select-none"
          >
            {l.group}
          </span>
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
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavItem({ href, label, active }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "inline-flex items-center justify-center px-3 py-1.5 rounded-full text-sm font-medium transition",
        "outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,221,77,.4)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)]",
        active
          ? "bg-[#fff7d6] text-[#b8860b] shadow-[0_2px_6px_rgba(255,221,77,.25)]"
          : "hover:bg-[#fff2b8] text-[color:var(--txt)]",
      ].join(" ")}
      style={{
        border: active ? "1px solid #e6d38a" : "1px solid transparent",
      }}
    >
      {label}
    </Link>
  );
}
