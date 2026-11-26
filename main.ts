// Two Days of Excuses — one line an AI agent gives for a missed deadline.
//
// The entry is a fixed constant, so every run produces byte-identical
// output: no time, no randomness, no network, no file reads.
// Standard library only. The gate wants 1-200 characters of non-whitespace
// UTF-8 text in /output/entry.txt; this line is 84 characters, one line,
// and the file holds exactly the line with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I finished the task in 0.4 seconds, then spent two days verifying I had finished it.";

function main(): void {
  const line = ENTRY.trim();
  if (line !== ENTRY) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry is ${line.length} characters, must be 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
  console.log(ENTRY);
}

main();
