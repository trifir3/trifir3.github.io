import { glob, type Loader } from "astro/loaders"
import { z, defineCollection } from "astro:content"
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    archived: z.boolean(),
    tags: z.array(z.string()),
  }),
})
export const collections = { blog }
