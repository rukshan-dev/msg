export function isMutable(value: unknown): value is object {
  return typeof value === "object" && value !== null && !Object.isFrozen(value);
}

export default isMutable;
