type Listener<T> = (...args: T[]) => void;

/**
 * `EventEmitter` embody the observer pattern in TypeScript.
 */
export class EventEmitter<T> {
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

  private _listeners: { listener: Listener<T>; signal?: AbortSignal }[] = [];
  emitted = false;

  add(listener: Listener<T>, options?: { signal?: AbortSignal }): void {
    const existingListener = this._listeners.find(x => x.listener === listener);
    if (!existingListener) {
      this._listeners.push({ listener, signal: options?.signal });
      options?.signal?.addEventListener("abort", () => this.remove(listener));
    }
  }

  addOnce(listener: Listener<T>, options?: { signal?: AbortSignal }): void {
    const onceListener = (...args: T[]) => {
      this.remove(onceListener);
      listener(...args);
    };

    this.add(onceListener, options);
  }

  public remove(listener: Listener<T>): void {
    const index = this._listeners.findIndex(x => x.listener === listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  public emit(...args: T[]): void {
    this.emitted = true;

    const listeners = [...this._listeners];
    for (const { listener } of listeners) {
      listener(...args);
    }
  }

  public removeAll(): void {
    this._listeners = [];
  }
}
