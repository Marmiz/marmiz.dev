---
title: "Wasm in Next: a brief introduction."
excerpt: "Do you know it's super easy to run wasm in Next.js?"
coverImage: "/assets/blog/wasm-in-next/cover.png"
date: "2021-06-18T21:21:32.221Z"
author:
  name: Claudio Restifo
  picture: "/assets/blog/authors/joe.jpeg"
ogImage:
  url: "/assets/blog/wasm-in-next/cover.png"
---

I have heard a lot of love for [WebAssembly](https://webassembly.org/) lately.
In case you don't know what WebAssembly is about here's the official description.

> WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

To put it simply it allows different languages and stacks to enter the realm of web development.
This allows languages such as Go, C, Rust (and many more) to be compiled and run inside a browser.

### Rust.

Rust has a first class support for wasm as well as an active development group and a dedicated page to it: [rust wasm](https://www.rust-lang.org/what/wasm).

### Next.

Next.js offers a very simple way of loading wasm module inside the source code thanks to [dynamic imports](https://nextjs.org/docs/advanced-features/dynamic-import).
We can also leverage _next/dynamic_ to use it like any other react component.

So I have decided to give both technology a try to see how well they play together.
I have followed Rust example and created Conway's Game of Life in Rust and compiled to WebAssembly.

At the end of the compilation I have a bunch of files as well as **types definition** for Typescript! How neat is that! :sunglasses:

### How.

The Rust part is of of the scope for this post; you can follow the official [rustwasm book](https://rustwasm.github.io/docs/book/) for more info.

Once we have our `pkg` folder ready, this is how we can use it inside Next and React:

```javascript

const RustComponent = dynamic({
  loader: async () => {
    // Import wasm module
    const { Universe, Cell } = await import("../pkg");
    const { memory } = await import("../pkg/wasm_in_next_bg.wasm");
    // return a React component that uses renderAnimationFrame for the game.
    return () => {
        // we can use Rust defined struct.
        const universe = Universe.new();
        const width = universe.width();
        const height = universe.height();

        // use normal react API
        const canvasRef = useRef<HTMLCanvasElement>(null!);

        // [ more implementation]

      // to render
      return (
          <canvas
            ref={canvasRef}
          />

    };
  },
  ssr: false, // since we use canvas we don't need it to be ssr
});
```

And that's pretty much it!

You can see it in action here [marmiz.dev/game-of-life](https://marmiz.dev/game-of-life).

Look at the source code on [github](https://github.com/Marmiz/marmiz.dev) to see the full implementation.

Hope this helped.
Have fun and happy coding! :sparkles:
