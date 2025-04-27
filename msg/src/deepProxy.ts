import { EventEmitter } from "./events";
import { AnyObject, DeepProxyProps } from "./types";
import isMutable from "./utils/isMutable";

const defaultOptions: DeepProxyProps<object> = {
  cache: new WeakMap(),
  paths: [],
  emitter: new EventEmitter<object>(),
};

const deepProxy = <T extends AnyObject>(
  object: T,
  options: DeepProxyProps<T> = defaultOptions
): T => {
  if (!isMutable(object)) {
    return object;
  }
  if (options.cache.has(object)) {
    return options.cache.get(object);
  }

  const proxy = new Proxy(object, {
    get(target, p, receiver) {
      const value = Reflect.get(target, p, receiver);
      return deepProxy(value, {
        ...options,
        paths: [...options.paths, String(p)],
      });
    },
    set(target, p, newValue, receiver) {
      const value = Reflect.set(target, p, newValue, receiver);
      const paths = [...options.paths, p];
      options.emitter.emit("updated", {
        state: target,
        paths,
        path: paths.join("."),
      });
      return value;
    },
  });

  options.cache.set(object, proxy);
  return proxy;
};

export default deepProxy;
