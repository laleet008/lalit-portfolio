import { describe, expect, it } from "vitest";
import { tokenize } from "@/lib/highlight";
import { projects } from "@/content";

describe("tokenize", () => {
  it("classifies the basics", () => {
    const kinds = tokenize("const x: Foo = bar('a', 2); // hi").filter((t) => t.kind !== "plain" && t.kind !== "punct");
    expect(kinds).toEqual([
      { kind: "keyword", text: "const" },
      { kind: "type", text: "Foo" },
      { kind: "fn", text: "bar" },
      { kind: "string", text: "'a'" },
      { kind: "number", text: "2" },
      { kind: "comment", text: "// hi" },
    ]);
  });

  it("round-trips every excerpt on the site losslessly", () => {
    for (const p of projects) {
      for (const h of p.highlights) {
        if (!h.code) continue;
        expect(tokenize(h.code.source).map((t) => t.text).join("")).toBe(h.code.source);
      }
    }
  });
});
