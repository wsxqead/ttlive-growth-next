"use client";
import Nav from "./Nav";
import { motion } from "framer-motion";

export default function LayoutShell({ children }) {
  return (
    <>
      {/* 헤더 */}
      <header
        className="sticky top-0 z-10 backdrop-blur-md border-b border-line"
        style={{
          background: "rgba(255, 247, 214, 0.7)", // 부드러운 금빛 반투명
          borderColor: "#e6d38a",
          boxShadow: "0 2px 8px rgba(255, 221, 77, 0.15)",
        }}
      >
        <div className="flex items-center gap-4 px-5 py-3">
          <div
            className="font-extrabold tracking-tight"
            style={{
              color: "#8b7500",
              textShadow: "0 1px 2px rgba(255, 255, 255, 0.3)",
            }}
          >
            띵라이브 성장 시스템
          </div>
          <span
            className="chip badge"
            style={{
              background: "#fff7d6",
              borderColor: "#e6d38a",
              color: "#8b7500",
              fontWeight: 600,
            }}
          >
            Fan Lv · Activity Grade · Titles · Badges
          </span>
        </div>
      </header>

      {/* 메인 */}
      <main
        className="flex flex-col gap-4 p-4"
        style={{
          background: "linear-gradient(180deg, #fffdf6 0%, #fffbe6 100%)",
        }}
      >
        {/* 네비게이션 */}
        <nav
          className="border-b pb-2"
          style={{
            borderColor: "#e6d38a",
          }}
        >
          <Nav />
        </nav>

        {/* 본문 애니메이션 섹션 */}
        <motion.section
          className="grid gap-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.section>
      </main>

      {/* 푸터 */}
      <footer
        className="border-t text-muted px-5 py-4 text-sm text-center"
        style={{
          borderColor: "#e6d38a",
          background: "#fff7d6",
          color: "#8b7500",
          fontWeight: 500,
        }}
      >
        © <span style={{ color: "#b8860b", fontWeight: 700 }}>TtingLive</span> —
        Growth System Prototype
      </footer>
    </>
  );
}
