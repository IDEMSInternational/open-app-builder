/**
 * Returns dotted names from the most-specific scope to the root scope.
 *
 * For example, 'a.b.c.value' resolves in this order:
 * ['a.b.c.value', 'a.b.value', 'a.value', 'value'].
 */
export function getScopeFallbackCandidates(name: string): string[] {
  const segments = name.split(".");
  if (segments.length <= 1) {
    return [name];
  }

  const valueName = segments[segments.length - 1];
  const scopes = segments.slice(0, -1);
  const candidates: string[] = [];

  for (let scopeCount = scopes.length; scopeCount >= 0; scopeCount -= 1) {
    candidates.push([...scopes.slice(0, scopeCount), valueName].join("."));
  }

  return candidates;
}
