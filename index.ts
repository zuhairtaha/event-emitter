type FunctionArguments<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];

export class EventEmitter<T> {
  private _listeners: Array<(...args: FunctionArguments<T>) => void> = [];

  add(listener: (...args: FunctionArguments<T>) => void) {
    if (this._listeners.indexOf(listener) === -1) {
      this._listeners.push(listener);
    }
  }

  // Alias methods
  addListener = this.add;
  addEventListener = this.add;
  subscribe = this.add;

  public remove(listener: (...args: FunctionArguments<T>) => void): void {
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  // Alias methods
  removeListener = this.remove;
  removeEventListener = this.remove;
  unsubscribe = this.remove;

  public emit(...args: FunctionArguments<T>): void {
    for (const listener of this._listeners) {
      listener(...args);
    }
  }

  public removeAll(): void {
    this._listeners = [];
  }
}
