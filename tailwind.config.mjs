/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector", // Enable selector strategy for dark mode
  theme: {
    fontFamily: {
      sans: ["FiraCode"],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              background: "var(--tw-prose-hr)",
              padding: ".125rem .25rem",
              borderRadius: ".25rem",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
