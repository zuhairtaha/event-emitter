# Event Emitter

[![npm version](https://img.shields.io/npm/v/tahasoft-event-emitter.svg?style=flat-square)](https://www.npmjs.com/package/tahasoft-event-emitter)
[![license](https://img.shields.io/npm/l/tahasoft-event-emitter.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/tahasoft-event-emitter.svg?style=flat-square)](https://www.npmjs.com/package/tahasoft-event-emitter)

Simple and generic JavaScript Event Emitter class for implementing the [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern).

The Observer Pattern is a behavioral design pattern where an object, known as the subject, maintains a list of dependents, known as observers, that are notified of any state changes.

The Observer Pattern is commonly used in scenarios where one part of a system needs to be notified of changes in another part without being tightly coupled to it. It promotes loose coupling between components, making it easier to maintain and extend the system.

![observer-pattern-typescript-javascript](images/javascript-observer.jpg)

## Installation

```bash
npm install tahasoft-event-emitter
```

# Usage

```js
import { EventEmitter } from "tahasoft-event-emitter";
```

## Example 1: Basic Event Emission

```js
const onStatusChange = new EventEmitter();

function updateStatus() {
  // ...
  onStatusChange.emit();
}
```

Somewhere else in your code, add a listener for the status change event:

```js
onStatusChange.add(() => {
  // ...
});
```

## Example 2: Event with Data

```js
/** @type {!EventEmitter<!string>} */
const onStatusChange = new EventEmitter();

function updateStatus(status) {
  // ...
  onStatusChange.emit(status);
}
```

Add a listener with data for the status change event:

```js
onStatusChange.add(status => {
  // ... (status is a string)
});
```

## Example 3: Using in a Class

```js
class User {
  constructor() {
    this.status = "";

    /** @type {!EventEmitter<!string>} */
    this.onStatusChange = new EventEmitter();
  }

  updateStatus(status) {
    this.status = status;
    onStatusChange.emit(status);
  }
}

const user = new User();
user.onStatusChange.add(status => {
  // do something
});
```

## Example 4: TypeScript Usage

```ts
class User {
  public onLogin = new EventEmitter<string>();

  public login(userName: string, password: string) {
    // validate username and password
    this.onLogin.emit(userName);
  }

  public logout() {
    // logout
    this.onLogin.removeAllListeners();
  }
}

const user = new User();

user.onLogin.add((name: string) => {
  console.log(`User ${name} has logged in`);
});

user.login("John", "1234abcd");
```

## Example 5: Using AbortController

```js
class User {
  constructor() {
    this.eventsAborter = new AbortController();
    this.onStatusChange = new EventEmitter();
    this.onLogin = new EventEmitter();

    const signal = this.eventsAborter.signal;
    this.onStatusChange.add(this.handleStatusChange, { signal });
    this.onLogin.add(
      () => {
        console.log("User logged in");
      },
      { signal }
    );
  }

  handleStatusChange() {
    console.log("status changed");
  }

  dispose() {
    // Abort all listeners
    this.eventsAborter.abort();
  }
}

const user = new User();

// Somewhere else in your code
user.onStatusChange.add(() => {
  console.log("Another listener for status change");
});

// Disposing of all listeners using AbortController
user.dispose();
```

# Listener Options

When adding a listener, you can pass an optional `options` object:

`signal` (AbortSignal): An `AbortSignal` to automatically remove the listener when the signal is triggered.

```js
const controller = new AbortController();
eventEmitter.add(listener, { signal: controller.signal });
```

# Methods

To add a listener, you can use any of the following:

```js
add(listener);
addListener(listener);
addEventListener(listener);
subscribe(listener);
```

Remove a listener using any of the following:

```js
remove(listener);
removeListener(listener);
removeEventListener(listener);
unsubscribe(listener);
```

To remove all listeners

```js
removeAllListeners();
```

Execute each of the listeners in order with the supplied arguments:

```js
emit(args);
dispatch(args);
```

The `args` parameter is optional and represents the arguments to be passed to the listeners.
