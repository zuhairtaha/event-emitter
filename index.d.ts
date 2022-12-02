declare module 'tahasoft-event-emitter' {
  type FunctionArguments<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];
  class EventEmitter<T> {
    private _listeners;
    add(listener: (...args: FunctionArguments<T>) => void): void;
    remove(listener: (...args: FunctionArguments<T>) => void): void;
    emit(...args: FunctionArguments<T>): void;
    removeAll(): void;
  }
}
