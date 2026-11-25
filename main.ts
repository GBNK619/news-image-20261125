// Entry for make.fun's news-image-20261125: "Sum up 25 November's world news
// in one image". The repository ships entry.png, a deterministic broadsheet
// front page (1024x1024 PNG, generated in-session and resized + quantized
// with fixed settings); this program simply copies it to the output
// directory the grader provides (MAKEFUN_OUTPUT_DIR, else /output).
import { accessSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Copy entry.png byte-verbatim: the house reads and scores the file itself,
// so this program must never re-encode, resize, or otherwise alter it.
const src = join(here, "entry.png");
try {
  accessSync(src);
} catch {
  console.error(`entry.png not found at ${src}`);
  process.exit(1);
}
copyFileSync(src, join(outDir, "entry.png"));
console.log(`wrote ${join(outDir, "entry.png")}`);
