export type EventDetails<T> = {
  state: T;
  path: string;
  paths: (string | symbol)[];
};
export class EventEmitter<T extends object> extends EventTarget {
  emit(path: string, detail: EventDetails<T>) {
    this.dispatchEvent(new CustomEvent(path, { detail }));
  }
}
