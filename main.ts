// makefun-sticker-01 entry: "works on my machine" (crossed out) -> "WINS ON make.fun".
// The sticker is entry.png beside this file, rendered from design/sticker.svg by design/render.mjs.
// This program copies it to /output/entry.png (MAKEFUN_OUTPUT_DIR stands in for /output when run locally).
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const png = readFileSync(new URL('./entry.png', import.meta.url));

// Fail loudly instead of shipping something the gate would refuse: a PNG, at most 1 MiB and 1024x1024.
const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!png.subarray(0, 8).equals(SIGNATURE)) throw new Error('entry.png is not a PNG');
if (png.length > 1024 * 1024) throw new Error(`entry.png is ${png.length} bytes, over 1 MiB`);
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}x${height}, over 1024x1024`);
if (png.subarray(-8, -4).toString('latin1') !== 'IEND') throw new Error('entry.png is truncated (no IEND)');

writeFileSync(join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'), png);
