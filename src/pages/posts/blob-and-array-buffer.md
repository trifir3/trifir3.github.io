---
layout: ../../layouts/MarkdownPostLayout.astro
title: Difference between blob and arraybuffer in XMLHttpRequest property responseType
tags:
  - JavaScript
pubDate: 2024-10-31
archived: false
description: ""
---

I\`ve never quite understood how to download a file using the binary data back-end returned. Whenever there is an export feature, I usually just search for the code and then copy-paste it. Upon doing yet another export feature on my day job, I decided to have a bit of a deeper dive into this topic. So I ended up on the MDN document on [responseType](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) property and found out that there seem to be two values, `blob` and `arraybuffer`, that do the same thing.

In the docs, it says that `arraybuffer` response is a JavaScript `ArrayBuffer` containing binary data and `blob` is a `Blob` object containing the binary data. So both of them are just something that contains binary data, what is the difference then?

## Blob

`Blob` is a file-like object of immutable raw data, and the `File` interface is based on `Blob`. So if the binary data is only for read, and in my case to download it, then using `Blob` is better. Also, `Blob` can pass to `window.URL.createObjectURL` directly, which makes using it to download much easier.

When using some third-party library like `axios`, the code could look something like below.

```js
axios.get("/download", { responseType: "blob" }).then((res) => {
  const url = window.URL.createObjectURL(res.data);
  const link = document.createElement("a");
  link.setAttribute("href", objecturl);
  link.setAttribute("download", fileName);
  link.click();
  window.URL.revokeObjectURL(objecturl);
});
```

And with web standard `fetch` api, it could be even more simpler thanks to `response.blob()` method.

```js
fetch("/download")
  .then((response) => response.blob())
  .then((blob) => {
    const url = URL.createObjectURL(blob);
  });
```

## ArrayBuffer

The **`ArrayBuffer`** object is used to represent a generic raw binary data buffer, in other languages as a "byte array". `ArrayBuffer` cannot be directly manipulated, but you can use them to create one of the typed array objects or `DataView` objects, and use these to write the contents of the buffer.
