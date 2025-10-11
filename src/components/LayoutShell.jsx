"use client";
import Nav from "./Nav";
import { motion } from "framer-motion";

export default function LayoutShell({ children }) {
  return (
    <>
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[rgba(180, 198, 235, 0.6)] border-b border-line">
        <div className="flex items-center gap-4 px-5 py-3">
          <div className="font-extrabold">띵라이브 성장 시스템</div>
          <span className="chip badge">
            Fan Lv · Activity Grade · Titles · Badges
          </span>
        </div>
      </header>

      <main className="grid gap-4 p-4 md:grid-cols-[280px_1fr]">
        <Nav />
        <motion.section
          className="grid gap-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.section>
      </main>

      <footer className="border-t border-line text-muted px-5 py-4">
        © TtingLive — Growth System Prototype
      </footer>
    </>
  );
}
