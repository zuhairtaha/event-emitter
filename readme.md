- [EventEmitter](#eventemitter)
- [Usage](#usage)
  - [Example 1](#example-1)
  - [Example 2](#example-2)
  - [Example 3](#example-3)
  - [Example 4](#example-4)
- [Methods](#methods)


# EventEmitter
A helper class to handle events in the browser (or in Node.js) help us to follow [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) and write a clean and readable code

![observer-pattern-typescript-javascript](images/javascript-observer.jpg)


# Usage
```js
import { EventEmitter } from 'tahasoft-event-emitter';
```

## Example 1
```js
const onStatusChange = new EventEmitter();

function updateStatus() {
  // ...
  onStatusChange.emit();
}
```
```js
// somewhere else, we want to add a listener when status change
onStatusChange.add(() => {
  // ...
});
```

## Example 2
With data for the event

```js
/** @type {!EventEmitter<!string>} */
const onStatusChange = new EventEmitter();

function updateStatus(status) {
  // ...
  onStatusChange.emit(status);
}
```
```js
// somewhere else, we want to add a listener when status change
onStatusChange.add(status => {
  // ... (status is a string)
});
```

## Example 3
In another class

```js
class User {
  constructor() {
    this.status = '';

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

## Example 4
Using TypeScript
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

user.login('John', '1234abcd');

```

# Methods
- To add a listener use any of those
```js
add(listener)
addListener(listener)
addEventListener(listener)
subscribe(listener)
```
- Remove a listener using any of those

```js
remove(listener)
removeListener(listener)
removeEventListener(listener)
unsubscribe(listener)
```
To remove all listeners
```js
removeAllListeners()
```

- Execute each of the listeners in order with the supplied arguments
```js
emit(args)
dispatch(args)
```
args: arguments which is optional
