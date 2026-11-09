// Renders design/sticker.svg to entry.png (1024x1024) with a local headless Edge or Chrome.
// Run from the repository root:  node design/render.mjs
// This is a design-time tool only; main.ts never runs it (the grader has no browser and no network).

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const browsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const browser = browsers.find(existsSync);
if (!browser) throw new Error('no Edge or Chrome found');

const svg = resolve('design/sticker.svg');
const out = resolve(process.argv[2] ?? 'entry.png');

execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--default-background-color=00000000',
  '--window-size=1024,1024',
  `--screenshot=${out}`,
  pathToFileURL(svg).href,
], { stdio: 'inherit' });

const png = readFileSync(out);
console.log(`${out}: ${statSync(out).size} bytes, ${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`);
