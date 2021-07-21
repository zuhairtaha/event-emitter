# Usage

## Example 1
```js
const onStatusChange = new EventEmitter();

function updateStatus() {
  // ...
  onStatusChange.emit();
}

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

## Methods

- `add` = `addListener` = `addEventListener`
- `remove` = `removeListener` = `removeEventListener`
- `on` = `dispatch`
