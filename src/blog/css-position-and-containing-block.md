---
title: CSS position property and the containing block
tags:
  - CSS
pubDate: 2025-01-02
archived: false
description: ""
---

## Position

> The **`position`** CSS property sets how an element is positioned in a document.

`position` property has 5 values: `static`, `relative`, `absolute`, `fixed` and `sticky`.

By default `position` is set to be `static`, and the element is positioned in the document in a normal layout flow: block element will fill up the available inline space of the parent element (span 100% of the width), inline element is just the size of its content and properties like `top`, `right`, `z-index` have zero effect.

`relative` positioned element is firstly placed the same as `static`, then offset relative to itself based on values of `top`, `right`, `left` and `right`. But this offset does not affect other element, it will still have the same space as `static` element. Now when set `z-index` to a value that is not `auto`, it will create a new stacking context (it can stack on other elements).

`absolute` value will remove the element from the normal layout flow, and other elements will treat it like it does not exist (no space for it). The position of this element is relative to its closest positioned (`position` is not `static`) ancestor or the initial containing block (more on this later) if there is no such ancestor. `z-index` works just like a relatively positioned element. Only `absolute` can set offset property of the same axis to get a certain size, like `left: 0; right: 0;` to fill all the available horizontal.

`fixed` element is just like `absolute` element, but it is always positioned relative to the initial containing block. This value also creates a new stacking context every time.

`sticky` element is positioned just like `static` at first, then when it been scrolled to a certain position relative to its nearest ancestor that has a "scrolling mechanism" (`overflow` is `hidden`, `scroll`, `auto`), sometimes that ancestor isn't the nearest actually scrolling ancestor.

## Containing Block

every element lives inside of a box that is divided into four areas: content area, padding area, border area and margin area.

![Diagram of the box model](images/box-model.png)

In most cases, the containing block of an element is the content area of its parent or corresponding ancestor (like in the case of relatively positioned elements). But there are some exceptions:

1. When property `position` is `absolute`, the containing block is the padding box (why? CSS why?) of the nearest non-`static` positioned ancestor element.
2. When property `position` is `fixed`, the containing block is the **initial containing block**, which is the viewport for continuous media.
3. If the `position` property is `absolute` or `fixed`, the containing block can also formed in the nearest ancestor element that has something like `filter` value other than `none`.

Now we have identified the containing block, what does it do? Here are some effects of the containing block:

1. Percentage values of `width`, `height`, `padding`, `margin` are computed from the element's containing block.
2. When `position` property is `aboslute` or `fixed`, offset value `top`, `left`, `right`, and `bottom` are computed from the element's containing block.

### sticky and containing block

For the property `sticky` to work, we need to be careful about the size of the element and its containing block.

When the size of a stickily positioned element is too large, like filling up the whole content of its containing block, it won't stick because it will never scroll to its offset position.

Also when the size of containing block is too small, the containing block itself can be scrolled away causing the stickily positioned element to be scrolled away too.

## References

[W3C: Definition of containing block](https://www.w3.org/TR/CSS2/visudet.html#containing-block-details)

[MDN: Containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block)

[MDN: Position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
