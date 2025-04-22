# Event Emitter

[![npm version](https://img.shields.io/npm/v/tahasoft-event-emitter.svg?style=flat-square)](https://www.npmjs.com/package/tahasoft-event-emitter)
[![license](https://img.shields.io/npm/l/tahasoft-event-emitter.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/tahasoft-event-emitter.svg?style=flat-square)](https://www.npmjs.com/package/tahasoft-event-emitter)

A modern, lightweight **Event Emitter** for JavaScript and TypeScript, inspired by the [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern).

**Key features:**

- 🚀 Simple API: `add`, `emit`, `remove`, `addOnce`, `removeAll`
- 🧑‍💻 TypeScript-first: Full type safety out of the box
- ✨ Both callback and Promise/async usage: `await emitter.addOnce()`
- 🦺 Memory-safe: Listeners can auto-remove with `AbortController`
- ⚡ Zero dependencies, production-ready, tiny footprint

> Use it for events, hooks, signals, or decoupled reactive design!

![observer-pattern-typescript-javascript](images/javascript-observer.jpg)

---

## Installation

```bash
npm install tahasoft-event-emitter
```

---

## Usage

```js
import { EventEmitter } from 'tahasoft-event-emitter';
```

---

### Basic Example

```js
/** @type {EventEmitter<string>} */
const onStatusChange = new EventEmitter();

onStatusChange.add(status => {
	console.log('Status changed to:', status);
});

onStatusChange.emit('Ready');
```

---

### Usage in a Class

```js
class User {
	constructor() {
		/** @type {EventEmitter<string>} */
		this.onStatusChange = new EventEmitter();
	}

	updateStatus(status) {
		this.onStatusChange.emit(status);
	}
}

const user = new User();
user.onStatusChange.add(status => {
	console.log('New status:', status);
});

user.updateStatus('Active');
```

---

### TypeScript Example

```ts
class User {
	public onLogin = new EventEmitter<string>();

	public login(userName: string, password: string) {
		// validate...
		this.onLogin.emit(userName);
	}
}

const user = new User();

user.onLogin.add(name => {
	console.log(`User ${name} has logged in`);
});

user.login('John', '1234abcd');
```

---

## Advanced Usage

### One-Time Listeners

Execute a listener only once, then remove automatically:

```js
onStatusChange.addOnce(status => {
	console.log('This runs once for status:', status);
});

onStatusChange.emit('Online'); // Triggers above
onStatusChange.emit('Offline'); // Listener is not called again
```

---

### Promise/Async-Await Style

Wait for the next event occurrence with a promise:

```js
async function waitForStatus() {
	const newStatus = await onStatusChange.addOnce();
	console.log('Status awaited:', newStatus);
}
waitForStatus();
onStatusChange.emit('Loaded');
```

### Cleanup with AbortController

Auto-remove listeners using AbortSignal:

```js
const controller = new AbortController();
onStatusChange.add(status => console.log('Listen once, then remove automatically if aborted:', status), {
	signal: controller.signal
});

// Later...
controller.abort(); // Listener is removed
```

---

## API Reference

### Add Listeners

```js
add(listener, options?)
addListener(listener, options?)
addEventListener(listener, options?)
subscribe(listener, options?)
```

`options` can include `{ signal: AbortSignal }` for automatic removal.

### Remove Listeners

```js
remove(listener);
removeListener(listener);
removeEventListener(listener);
unsubscribe(listener);
```

### Remove All Listeners

```js
removeAll();
removeAllListeners();
```

### Emit an Event

```js
emit(arg);
dispatch(arg);
```

The `arg` is passed to all listeners.

### One-Time Listeners

- **Callback form:**  
  `addOnce(listener, options?)`
- **Promise form:**  
  `await addOnce(options?)` resolves with the next value emitted.

---

## Listener Options

`{ signal: AbortSignal }` – pass an [AbortController signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) for automatic listener removal:

```js
const controller = new AbortController();
emitter.add(listener, { signal: controller.signal });
controller.abort(); // listener removed
```

---

## Why Choose This EventEmitter?

- **Strictly typed** for single-argument events—works great with primitives or objects.
- **Promise/async support** for modern codebases.
- **Abortsafe:** no memory leaks—auto-cleanup with `AbortController`.
- **Minimal and fast**—~1KB gzipped, zero dependencies.
- **Production ready**—used in both Node.js and browser projects.

---

## License

MIT

---

> Powered by tahasoft-event-emitter – the robust TypeScript/JavaScript event emitter for modern apps.
