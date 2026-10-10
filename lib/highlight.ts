/*
 * A small TypeScript/TSX tokenizer for the case-study code excerpts. Runs at
 * build time in Server Components, so it ships no JavaScript. It handles what
 * the excerpts contain (comments, strings, keywords, numbers, types, calls),
 * not the whole language.
 */

export type TokenKind = "comment" | "string" | "keyword" | "number" | "type" | "fn" | "punct" | "plain";
export type Token = { kind: TokenKind; text: string };

const KEYWORDS = new Set(
  "as async await break case catch class const continue default delete do else export extends false for from function if import in instanceof interface let new null of return switch this throw true try type typeof undefined var void while yield".split(
    " ",
  ),
);

const RULES: [TokenKind | "ident", RegExp][] = [
  ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
  ["string", /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/y],
  ["number", /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/y],
  ["ident", /[A-Za-z_$][\w$]*/y],
  ["punct", /[{}()[\];,.:?!<>=+\-*/%&|^~@]+/y],
  ["plain", /\s+|./y],
];

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    for (const [kind, re] of RULES) {
      re.lastIndex = i;
      const m = re.exec(source);
      if (!m) continue;
      const text = m[0];
      let k: TokenKind = kind === "ident" ? "plain" : kind;
      if (kind === "ident") {
        if (KEYWORDS.has(text)) k = "keyword";
        else if (/^[A-Z]/.test(text)) k = "type";
        else if (source[i + text.length] === "(") k = "fn";
      }
      const last = tokens[tokens.length - 1];
      if (last && last.kind === k) last.text += text;
      else tokens.push({ kind: k, text });
      i += text.length;
      break;
    }
  }
  return tokens;
}
