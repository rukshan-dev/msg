import {
  AnyObject,
  getSelectorPath,
  isPathImpacted,
  StoreReturn,
  ImpactMode,
} from "@repacked-tools/msg";
import { useRef, useSyncExternalStore } from "react";

type Selector<T extends AnyObject, K = any> = (state: T) => K;
type SelectorOptions = {
  mode: ImpactMode;
};

export const useSelector = <T extends AnyObject, K>(
  store: StoreReturn<T, any>,
  selector: Selector<T, K>,
  options: Partial<SelectorOptions> = {}
) => {
  const impactRef = useRef(true);
  const selectedValueRef = useRef<K | null>(null);

  const subscribe = (callback: () => void) => {
    const unsubscribe = store.subscribe((detail) => {
      if (
        isPathImpacted(detail.paths, getSelectorPath(selector), options.mode)
      ) {
        impactRef.current = true;
        callback();
      }
    });
    return unsubscribe.unsubscribe;
  };

  const cloneValue = (value: K) => {
    if (Array.isArray(value)) {
      return [...value] as K;
    }
    if (typeof value === "object" && value !== null) {
      return { ...value } as K;
    }
    return value;
  };

  const getSnapshot = () => {
    if (impactRef.current) {
      const selected = selector(store.getState());
      selectedValueRef.current = cloneValue(selected);
      impactRef.current = false;
    }
    return selectedValueRef.current;
  };

  return useSyncExternalStore(subscribe, getSnapshot);
};
