---
layout: ../../layouts/MarkdownPostLayout.astro
title: The CSS contain property and BFC
tags:
  - CSS
pubDate: 2025-08-25
archived: false
description: ""
---

The other day I saw this [post](https://www.granola.ai/blog/dont-animate-height) about how a simple CSS animation: `transition: height 300ms ease-in-out` leads to using 60% of the CPU of a M2 MacBook which is quite a performance problem. And it turns out that the `height` property is a **layout property**, which means that every change of it triggers a layout recalculation then re-painting and re-compositing, making it one of the most expensive CSS properties to animate. The solution from the original author is to switch from changing the `height` to use `transform`, a **composite property** that only triggers a cheap re-compositing.

## Modern solution

Although the story is both interesting and educational, I felt there was something wrong about this whole thing. How is it that modern browsers can't even properly animate `height` property without recalculating the whole web page? After reading through the comments under the [HN post](https://news.ycombinator.com/item?id=44619206), I found the [`contain`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) property which is perfectly suited for this problem. This CSS property basically tells the browser that changes inside the container only trigger recalculation inside of this DOM subtree as opposed to the entire page. From MDN about the benefit of using `contain`:

> The main benefit of containment is that the browser does not have to re-render the DOM or page layout as often, leading to small performance benefits during the rendering of static pages and greater performance benefits in more dynamic applications.

## BFC

### Definition

Setting the `contain` property to some values also creates a new [block formatting context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context). It does makes a lot of sense as BFC is like a weaker version of `contain`. Common methods of creating BFC include: setting `overflow` to any value other than `visible` or `clip`, positioning the element absolutely, or becoming flex or grid items as direct children of flex or grid container. The modern approach is using `display: flow-root`.

The definition of BFC on MDN is:

> It's the region in which **the layout of block boxes** occurs and in which **floats** interact with **other elements**.

I always find this introduction way too abstract and hard to understand. Instead of trying to understand all that fancy words, it is easier to just remember the effects of BFC:

> contain internal floats
> exclude external floats
> suppress [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)

The first two effects are pretty easy, just as the name implies, BFC will prevent:

- internal floats poke out of the element
- external floats overlap with the element

### Margin collapsing

In some situations, the top and bottom margins collapse into each other resulting in a single margin, the final margin is just the largest margin of the two. This behavior occurs in three basic cases:

- adjacent siblings
- parent and child with no content in between: the margin-top of parent and the margin-top of its first child, margin-bottom and the last child.
- empty blocks: its own margin-top and margin-bottom

Note that these basic cases can be combined into more complex situation, and may even involve negative margins.

# References

[granola.ai: Don't animate height](https://www.granola.ai/blog/dont-animate-height)

[HackerNews: Don't animate height](https://news.ycombinator.com/item?id=44619206)

[MDN: contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)

[MDN: Block formatting context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context)

[MDN: margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
