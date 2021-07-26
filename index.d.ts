declare module 'tahasoft-event-emitter' {
  class EventEmitter<T> {
    emit(args: T): void;
    add(listener: (...args: T[]) => void): void;
    subscribe(listener: (...args: T[]) => void): void;
    addListener(listener: (...args: T[]) => void): void;
    addEventListener(listener: (...args: T[]) => void): void;
    remove(listener: (...args: T[]) => void): void;
    unsubscribe(listener: (...args: T[]) => void): void;
    removeListener(listener: (...args: T[]) => void): void;
    removeEventListener(listener: (...args: T[]) => void): void;
    removeAll(): void;
    removeAllListeners(): void;
    emit(...args: T[]): void;
    dispatch(...args: T[]): void;
  }
} 