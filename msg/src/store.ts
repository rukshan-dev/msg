import deepProxy, { AnyObject, DeepProxyProps } from "./deepProxy";
import { EventDetails, EventEmitter } from "./events";
import { Actions, StoreOptions, StoreReturn } from "./types";

export const createStore = <T extends AnyObject, K extends Actions<T>>(
  defaultValues: T,
  actions: K,
  options: Partial<StoreOptions<T, K>> = {}
): StoreReturn<T, K> => {
  const emitter = new EventEmitter<T>();

  const proxyOptions: DeepProxyProps<T> = {
    cache: new WeakMap(),
    paths: [],
    emitter,
  };

  const state = {
    current: defaultValues,
  };

  const getState = (): T => {
    return deepProxy(state.current, proxyOptions);
  };

  const getRawState = () => {
    return state.current;
  };

  const setState = (callback: (state: T) => void): void => {
    callback(getState());
  };

  /**
   *
   * @description `setRawState` does not trigger update event.
   */
  const setRawState = (callback: (state: T) => void): void => {
    callback(getRawState());
  };

  const subscribe = (callback: (details: EventDetails<T>) => void) => {

    const subscriberFn: EventListener = (event: Event) => {
      //@todo - fix types
      const _e = event as CustomEvent<EventDetails<T>>;
      callback(_e.detail);
    };

    emitter.addEventListener("updated", subscriberFn);

    return {
      unsubscribe: () => {
        emitter.removeEventListener("updated", subscriberFn);
      },
    };
  };

  const actionFunctions = actions(getState()) as ReturnType<typeof actions>;

  const dispatch = <T extends keyof ReturnType<typeof actions>>(
    action: T,
    ...args: Parameters<ReturnType<typeof actions>[T]>
  ) => {
    actionFunctions[action](...args);
  };

  const storeReturn: StoreReturn<T, K> = {
    getState,
    getRawState,
    setState,
    setRawState,
    subscribe,
    actions: actionFunctions,
    dispatch,
  };

  return storeReturn;
};
