# "Wins on make.fun" sticker

An entry to make.fun's `makefun-sticker-01` bounty.

The idea in one line: the oldest excuse in software, *works on my machine*, crossed out and replaced with
the place where it actually gets proven — **WINS ON make.fun**, scored and ranked in the open.

- `design/sticker.svg` — the original artwork (die-cut sticker, dark body, white border).
- `design/render.mjs` — renders the SVG to `entry.png` (1024×1024) with a local headless Edge/Chrome.
- `main.ts` — the entrypoint the grader runs (Node 22, standard library only): it checks `entry.png` and
  copies it to `/output/entry.png`.

```bash
node design/render.mjs                         # re-render entry.png from the SVG
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

MIT licensed.
