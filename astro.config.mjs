// @ts-check
import { defineConfig } from "astro/config"

import sitemap from "@astrojs/sitemap"

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://trifir3.github.io",
  integrations: [sitemap()],

  prefetch: {
    prefetchAll: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
})