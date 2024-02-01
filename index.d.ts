declare module "tahasoft-event-emitter" {
  type FunctionArguments<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];
  class EventEmitter<T> {
    private _listeners;
    add(listener: (...args: FunctionArguments<T>) => void): void;
    addListener: (listener: (...args: FunctionArguments<T>) => void) => void;
    addEventListener: (listener: (...args: FunctionArguments<T>) => void) => void;
    subscribe: (listener: (...args: FunctionArguments<T>) => void) => void;
    remove(listener: (...args: FunctionArguments<T>) => void): void;
    removeListener: (listener: (...args: FunctionArguments<T>) => void) => void;
    removeEventListener: (listener: (...args: FunctionArguments<T>) => void) => void;
    unsubscribe: (listener: (...args: FunctionArguments<T>) => void) => void;
    emit(...args: FunctionArguments<T>): void;
    removeAll(): void;
  }
}
