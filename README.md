# msg

A tiny TypeScript store built on Proxies to make immutable-feeling state updates easy. The library deep-proxies your objects so that mutating nested properties automatically emits update events and keeps a single source of truth for your state.

## Installation

```bash
yarn add @repacked-tools/msg
# or
npm install @repacked-tools/msg
```

## Quick start

Define your default state shape and provide a function that returns your action implementations. Actions receive the proxied state so you can mutate it directly without manual copying.

```ts
import { createStore } from "@repacked-tools/msg";

type CounterState = { count: number };

const actions = (state: CounterState) => ({
  increment() {
    state.count += 1;
  },
  add(amount: number) {
    state.count += amount;
  },
});

const counterStore = createStore<CounterState, typeof actions>({ count: 0 }, actions);

// Call actions directly
counterStore.actions.increment();
counterStore.actions.add(5);

console.log(counterStore.getState().count); // 6
```

## Subscribing to changes

Every mutation performed through the proxied state triggers an `updated` event. You can subscribe to these events to react to changes in your app.

```ts
const subscription = counterStore.subscribe(({ state, path, paths }) => {
  console.log("State changed at", path); // e.g., "count"
  console.log("New count", state.count);
  console.log("Path segments", paths); // ["count"]
});

counterStore.actions.increment();

subscription.unsubscribe();
```

If you need to perform updates without notifying subscribers, use `setRawState` to bypass the event emitter:

```ts
counterStore.setRawState((state) => {
  state.count = 100; // Subscribers will NOT be notified
});
```

## Dispatching actions

You can dispatch actions by name, which is useful when composing middleware or integrating with other tooling.

```ts
counterStore.dispatch("add", 10);
```

## Using middleware

`applyMiddlewares` wraps a store and lets you intercept or augment dispatch calls. Middlewares follow a familiar `(store) => (next) => (action, ...args)` shape.

```ts
import { applyMiddlewares, Middleware } from "@repacked-tools/msg";

const logger: Middleware<CounterState, typeof actions> = (store) => (next) => (
  action,
  ...args
) => {
  console.log(`Action ${String(action)} called with`, args);
  return next(action, ...args);
};

const enhancedStore = applyMiddlewares(counterStore)(logger);

enhancedStore.actions.increment();
```

## Building from source

To build the library locally:

```bash
cd msg
yarn install
yarn build:local
```

Use `yarn build:npm` to build and generate the publishable artifacts (including the manifest and license file) into `dist/`.

---

Licensed under the MIT License.
