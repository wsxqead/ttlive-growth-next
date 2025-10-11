/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0e14",
        panel: "#0f141b",
        line: "#1e2633",
        line2: "#2a3446",
        txt: "#e8ecf1",
        muted: "#9fb0c4",
        brand: "#7aa2ff",
        brand2: "#a97bff",
        accent: "#5df2d6",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.02)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};
