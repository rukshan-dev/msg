export function getSelectorPath<T, R>(selector: (state: T) => R): string[] {
  const path: string[] = [];

  const proxy = new Proxy(
    {},
    {
      get(_, prop) {
        path.push(String(prop));
        return proxy;
      },
    }
  ) as T;

  selector(proxy);

  return path;
}

export default getSelectorPath;
