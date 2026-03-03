/**
 * Minimal inline of https://github.com/ForbesLindesay/character-parser
 * To fix Vite compatibility issue when trying to import package
 */

enum TOKEN_TYPES {
  LINE_COMMENT = "LINE_COMMENT",
  BLOCK_COMMENT = "BLOCK_COMMENT",
  SINGLE_QUOTE = "SINGLE_QUOTE",
  DOUBLE_QUOTE = "DOUBLE_QUOTE",
  TEMPLATE_QUOTE = "TEMPLATE_QUOTE",
  REGEXP = "REGEXP",
  ROUND_BRACKET = "ROUND_BRACKET",
  CURLY_BRACKET = "CURLY_BRACKET",
  SQUARE_BRACKET = "SQUARE_BRACKET",
}

type OpenBracket = "(" | "{" | "[";
type CloseBracket = ")" | "}" | "]";

function isOpenBracket(c: string): c is OpenBracket {
  return c === "(" || c === "{" || c === "[";
}
function isCloseBracket(c: string): c is CloseBracket {
  return c === ")" || c === "}" || c === "]";
}
function getBracketType(b: OpenBracket): TOKEN_TYPES {
  switch (b) {
    case "(":
      return TOKEN_TYPES.ROUND_BRACKET;
    case "{":
      return TOKEN_TYPES.CURLY_BRACKET;
    case "[":
      return TOKEN_TYPES.SQUARE_BRACKET;
  }
}
function isMatchingBracket(c: CloseBracket, t: TOKEN_TYPES): boolean {
  switch (t) {
    case TOKEN_TYPES.ROUND_BRACKET:
      return c === ")";
    case TOKEN_TYPES.CURLY_BRACKET:
      return c === "}";
    case TOKEN_TYPES.SQUARE_BRACKET:
      return c === "]";
    default:
      return false;
  }
}

class State {
  stack: TOKEN_TYPES[] = [];
  regexpStart = false;
  escaped = false;
  hasDollar = false;
  src = "";
  history = "";
  lastChar = "";

  current() {
    return this.stack[this.stack.length - 1];
  }
  isString() {
    const c = this.current();
    return (
      c === TOKEN_TYPES.SINGLE_QUOTE ||
      c === TOKEN_TYPES.DOUBLE_QUOTE ||
      c === TOKEN_TYPES.TEMPLATE_QUOTE
    );
  }
  isComment() {
    const c = this.current();
    return c === TOKEN_TYPES.LINE_COMMENT || c === TOKEN_TYPES.BLOCK_COMMENT;
  }
  isNesting(opts?: { readonly ignoreLineComment?: boolean }) {
    if (
      opts?.ignoreLineComment &&
      this.stack.length === 1 &&
      this.stack[0] === TOKEN_TYPES.LINE_COMMENT
    ) {
      return false;
    }
    return !!this.stack.length;
  }
}

function isPunctuator(c: string): boolean {
  if (!c) return true;
  const code = c.charCodeAt(0);
  return [
    46, 40, 41, 59, 44, 123, 125, 91, 93, 58, 63, 126, 37, 38, 42, 43, 45, 47, 60, 62, 94, 124, 33,
    61,
  ].includes(code);
}

function isKeyword(id: string): boolean {
  const keywords = new Set([
    "if",
    "in",
    "do",
    "var",
    "for",
    "new",
    "try",
    "let",
    "this",
    "else",
    "case",
    "void",
    "with",
    "enum",
    "while",
    "break",
    "catch",
    "throw",
    "const",
    "yield",
    "class",
    "super",
    "return",
    "typeof",
    "delete",
    "switch",
    "export",
    "import",
    "default",
    "finally",
    "extends",
    "function",
    "continue",
    "debugger",
    "package",
    "private",
    "interface",
    "instanceof",
    "implements",
    "protected",
    "public",
    "static",
  ]);
  return keywords.has(id);
}

function isRegexp(history: string): boolean {
  history = history.replace(/^\s*/, "");
  if (history[0] === ")") return false;
  if (history[0] === "}") return true;
  if (isPunctuator(history[0])) return true;
  const match = /^\w+\b/.exec(history);
  if (match && isKeyword(match[0].split("").reverse().join(""))) return true;
  return false;
}

function parseChar(character: string, state: State): State {
  if (character.length !== 1) {
    const err = new Error("Character must be a string of length 1");
    err.name = "InvalidArgumentError";
    throw err;
  }
  state.src += character;
  const wasComment = state.isComment();
  const lastChar = state.history ? state.history[0] : "";

  if (state.regexpStart) {
    if (character === "/" || character === "*") {
      state.stack.pop();
    }
    state.regexpStart = false;
  }
  switch (state.current()) {
    case TOKEN_TYPES.LINE_COMMENT:
      if (character === "\n") state.stack.pop();
      break;
    case TOKEN_TYPES.BLOCK_COMMENT:
      if (state.lastChar === "*" && character === "/") state.stack.pop();
      break;
    case TOKEN_TYPES.SINGLE_QUOTE:
      if (character === "'" && !state.escaped) state.stack.pop();
      else if (character === "\\" && !state.escaped) state.escaped = true;
      else state.escaped = false;
      break;
    case TOKEN_TYPES.DOUBLE_QUOTE:
      if (character === '"' && !state.escaped) state.stack.pop();
      else if (character === "\\" && !state.escaped) state.escaped = true;
      else state.escaped = false;
      break;
    case TOKEN_TYPES.TEMPLATE_QUOTE:
      if (character === "`" && !state.escaped) {
        state.stack.pop();
        state.hasDollar = false;
      } else if (character === "\\" && !state.escaped) {
        state.escaped = true;
        state.hasDollar = false;
      } else if (character === "$" && !state.escaped) {
        state.hasDollar = true;
      } else if (character === "{" && state.hasDollar) {
        state.stack.push(TOKEN_TYPES.CURLY_BRACKET);
      } else {
        state.escaped = false;
        state.hasDollar = false;
      }
      break;
    case TOKEN_TYPES.REGEXP:
      if (character === "/" && !state.escaped) state.stack.pop();
      else if (character === "\\" && !state.escaped) state.escaped = true;
      else state.escaped = false;
      break;
    default:
      if (isOpenBracket(character)) {
        state.stack.push(getBracketType(character));
      } else if (isCloseBracket(character)) {
        if (!isMatchingBracket(character, state.current())) {
          throw new SyntaxError("Mismatched Bracket: " + character);
        }
        state.stack.pop();
      } else if (lastChar === "/" && character === "/") {
        state.history = state.history.substr(1);
        state.stack.push(TOKEN_TYPES.LINE_COMMENT);
      } else if (lastChar === "/" && character === "*") {
        state.history = state.history.substr(1);
        state.stack.push(TOKEN_TYPES.BLOCK_COMMENT);
      } else if (character === "/" && isRegexp(state.history)) {
        state.stack.push(TOKEN_TYPES.REGEXP);
        state.regexpStart = true;
      } else if (character === "'") {
        state.stack.push(TOKEN_TYPES.SINGLE_QUOTE);
      } else if (character === '"') {
        state.stack.push(TOKEN_TYPES.DOUBLE_QUOTE);
      } else if (character === "`") {
        state.stack.push(TOKEN_TYPES.TEMPLATE_QUOTE);
      }
      break;
  }
  if (!state.isComment() && !wasComment) {
    state.history = character + state.history;
  }
  state.lastChar = character;
  return state;
}

function matches(str: string, matcher: string | RegExp, i: number): boolean {
  if (typeof matcher === "string") {
    return str.substr(i, matcher.length) === matcher;
  }
  return matcher.test(str.substr(i));
}

export function parseUntil(
  src: string,
  delimiter: string | RegExp,
  options: {
    readonly start?: number;
    readonly ignoreLineComment?: boolean;
    readonly ignoreNesting?: boolean;
  } = {}
) {
  const start = options.start || 0;
  let index = start;
  const state = new State();
  for (; index < src.length; index++) {
    if ((options.ignoreNesting || !state.isNesting(options)) && matches(src, delimiter, index)) {
      return { start, end: index, src: src.substring(start, index) };
    }
    try {
      parseChar(src[index], state);
    } catch (ex: any) {
      ex.index = index;
      throw ex;
    }
  }
  const err = new Error("The end of the string was reached with no closing bracket found.");
  (err as any).code = "CHARACTER_PARSER:END_OF_STRING_REACHED";
  (err as any).index = index;
  throw err;
}
