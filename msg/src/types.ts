import { EventDetails, EventEmitter } from "./events";

export type AnyObject = Record<string | symbol | number, any>;

export type DeepProxyProps<T extends AnyObject> = {
  cache: WeakMap<object, any>;
  paths: string[];
  emitter: EventEmitter<T>;
};

export type Action<A extends any[] = any[]> = (
  ...args: A
) => void | Promise<void>;
export type Actions<T> = (state: T) => Record<string, Action>;

export type StoreReturn<T extends AnyObject, K extends Actions<T>> = {
  getState: () => T;
  getRawState: () => T;
  setState: (callback: (state: T) => void) => void;
  setRawState: (callback: (state: T) => void) => void;
  subscribe: (callback: (details: EventDetails<T>) => void) => {
    unsubscribe: () => void;
  };
  actions: ReturnType<K>;
  dispatch: <T extends keyof ReturnType<K>>(
    action: T,
    ...args: Parameters<ReturnType<K>[T]>
  ) => void;
};

export type Middleware<T extends AnyObject, K extends Actions<T>> = (
  store: StoreReturn<T, K>
) => (
  dispatch: (typeof store)["dispatch"]
) => <T extends keyof ReturnType<K>>(
  action: T,
  ...args: Parameters<ReturnType<K>[T]>
) => void;

export type StoreOptions<T extends AnyObject, K extends Actions<T>> = {};

export type Store<T extends AnyObject, K extends Actions<T>> = (
  defaultValues: T,
  actions: K,
  options: Partial<StoreOptions<T, K>>
) => StoreReturn<T, K>;

export enum ImpactMode {
  Strict = "strict",
  Nested = "nested",
}
