import "./globals.css";
import LayoutShell from "../components/LayoutShell";

export const metadata = {
  title: "띵라이브 — 성장 시스템",
  description: "Fan Lv · Activity Grade · Titles · Badges",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
