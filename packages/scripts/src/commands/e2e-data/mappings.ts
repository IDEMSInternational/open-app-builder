export function click(input = "") {
  const [target, text] = input.split(",");

  if (text !== undefined) {
    return `cy.get(${quote(target)}).contains(${quote(text)}).click()`;
  }

  return `cy.get(${quote(input)}).click()`;
}

export function pathname(path = "") {
  return `cy.location("pathname").should("eq", ${quote(path)})`;
}

export function missing(selector = "") {
  return `cy.get(${quote(selector)}).should("not.exist")`;
}

export function screenshot() {
  return `cy.screenshot()`;
}

export function visible(selector = "") {
  return `cy.get(${quote(selector)}).should("be.visible")`;
}

export function visit(path = "") {
  return `cy.visit(${quote(path)})`;
}

export function wait(ms = 0) {
  return `cy.wait(${ms})`;
}

// If input string contains double quotes, wrap in single quotes.
function quote(s = "") {
  const q = s.includes('"') ? "'" : '"';

  return `${q}${s}${q}`;
}
