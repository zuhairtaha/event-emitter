declare module 'tahasoft-event-emitter' {
	type Listener<T> = (arg: T) => void;
	type Options = {
		signal?: AbortSignal;
	};
	class EventEmitter<T> {
		addListener: (listener: Listener<T>, options?: Options) => void;
		addEventListener: (listener: Listener<T>, options?: Options) => void;
		subscribe: (listener: Listener<T>, options?: Options) => void;
		removeListener: (listener: Listener<T>) => void;
		removeEventListener: (listener: Listener<T>) => void;
		unsubscribe: (listener: Listener<T>) => void;
		dispatch: (arg: T) => void;
		once: {
			(listener: Listener<T>, options?: Options): void;
			(options?: Options): Promise<T>;
		};
		wait: {
			(listener: Listener<T>, options?: Options): void;
			(options?: Options): Promise<T>;
		};
		private _listeners;
		private readonly _abortHandlers;
		emitted: boolean;
		add(listener: Listener<T>, options?: Options): void;
		private _removeAbortHandler;
		private _addOnce;
		private _addOnceAsync;
		addOnce(listener: Listener<T>, options?: Options): void;
		addOnce(options?: Options): Promise<T>;
		remove(listener: Listener<T>): void;
		emit(arg: T): void;
		removeAll(): void;
	}
}
