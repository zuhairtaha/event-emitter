type Listener<T> = (...args: T[]) => void;

export class EventEmitter<T> {
  private _listeners: Listener<T>[] = [];

  // Alias methods
  addListener = this.add;
  addEventListener = this.add;
  subscribe = this.add;
  removeListener = this.remove;
  removeEventListener = this.remove;
  unsubscribe = this.remove;
  dispatch = this.emit;
  once = this.addOnce;
  wait = this.addOnce;

  add(listener: Listener<T>) {
    if (this._listeners.indexOf(listener) === -1) {
      this._listeners.push(listener);
    }
  }

  addOnce(listener: Listener<T>) {
    const onceListener = (...args: T[]) => {
      this.remove(onceListener);
      listener(...args);
    };
    this.add(onceListener);
  }

  public remove(listener: Listener<T>): void {
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  public emit(...args: T[]): void {
    for (const listener of this._listeners) {
      listener(...args);
    }
  }

  public removeAll(): void {
    this._listeners = [];
  }
}
