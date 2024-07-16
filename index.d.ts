declare module "tahasoft-event-emitter" {
  type Listener<T> = (...args: T[]) => void;
  class EventEmitter<T> {
    addListener: (
      listener: Listener<T>,
      options?: {
        signal?: AbortSignal;
      }
    ) => void;
    addEventListener: (
      listener: Listener<T>,
      options?: {
        signal?: AbortSignal;
      }
    ) => void;
    subscribe: (
      listener: Listener<T>,
      options?: {
        signal?: AbortSignal;
      }
    ) => void;
    removeListener: (listener: Listener<T>) => void;
    removeEventListener: (listener: Listener<T>) => void;
    unsubscribe: (listener: Listener<T>) => void;
    dispatch: (...args: T[]) => void;
    once: (
      listener: Listener<T>,
      options?: {
        signal?: AbortSignal;
      }
    ) => void;
    wait: (
      listener: Listener<T>,
      options?: {
        signal?: AbortSignal;
      }
    ) => void;
    private _listeners;
    emitted: boolean;
    add(listener: Listener<T>, options?: { signal?: AbortSignal }): void;
    addOnce(listener: Listener<T>, options?: { signal?: AbortSignal }): void;
    remove(listener: Listener<T>): void;
    emit(...args: T[]): void;
    removeAll(): void;
  }
}
