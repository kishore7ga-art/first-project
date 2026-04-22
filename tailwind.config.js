module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
      fontSize: {
        "responsive-xs": ["0.75rem", { lineHeight: "1rem" }],
        "responsive-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "responsive-base": ["1rem", { lineHeight: "1.5rem" }],
        "responsive-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "responsive-xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "responsive-2xl": ["1.5rem", { lineHeight: "2rem" }],
        "responsive-3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "responsive-4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "responsive-5xl": ["3rem", { lineHeight: "1" }],
        "responsive-6xl": ["3.75rem", { lineHeight: "1" }],
        "responsive-7xl": ["4.5rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
