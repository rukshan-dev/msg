import {
  AnyObject,
  getSelectorPath,
  isPathImpacted,
  StoreReturn,
} from "@repacked-tools/msg";
import { useRef, useSyncExternalStore } from "react";

type Selector<T extends AnyObject, K = any> = (state: T) => K;

export const useSelector = <T extends AnyObject, K>(
  store: StoreReturn<T, any>,
  selector: Selector<T, K>
) => {
  const immutableRef = useRef<any>({ value: null });
  useSyncExternalStore(
    (callback) => {
      const subscribe = store.subscribe((detail) => {
        const selectedPath = getSelectorPath(selector);
        if (isPathImpacted(detail.paths, selectedPath)) {
          immutableRef.current = { value: selector(store.getState()) };
          callback();
        }
      });
      return subscribe.unsubscribe;
    },
    () => {
      return immutableRef.current;
    }
  );

  return selector(store.getState());
};
