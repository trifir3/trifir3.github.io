import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET(context) {
  const posts = await getCollection("blog")

  return rss({
    title: "trifir3's blog",
    description: "A blog about web development",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
    })),
    customData: `<language>en-us</language>`,
  })
}
