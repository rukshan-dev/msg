import { AnyObject } from "./deepProxy";
import { Actions, Middleware, StoreReturn } from "./types";

export const applyMiddlewares = <T extends AnyObject, K extends Actions<T>>(
  store: StoreReturn<T, K>
) => {
  return (...middlewares: Middleware<T, K>[]) => {
    let dispatch = store.dispatch;

    middlewares.reverse().forEach((middleware) => {
      dispatch = middleware(store)(dispatch);
    });

    let actions = new Proxy(store.actions, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
          return (...args: any[]) => {
            return dispatch(prop as any, ...(args as any));
          };
        }
      },
    });

    return { ...store, actions, dispatch };
  };
};
