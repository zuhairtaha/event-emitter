type Listener<T> = (arg: T) => void;
type Options = { signal?: AbortSignal };

/**
 * `EventEmitter` embody the observer pattern in TypeScript.
 */
export class EventEmitter<T> {
	// Alias methods
	public addListener = this.add;
	public addEventListener = this.add;
	public subscribe = this.add;
	public removeListener = this.remove;
	public removeEventListener = this.remove;
	public unsubscribe = this.remove;
	public dispatch = this.emit;
	public once = this.addOnce;
	public wait = this.addOnce;

	private _listeners: { listener: Listener<T>; signal?: AbortSignal }[] = [];
	private readonly _abortHandlers = new WeakMap<Listener<T>, () => void>();
	public emitted = false;

	public add(listener: Listener<T>, options?: Options): void {
		const existingListener = this._listeners.find(x => x.listener === listener);
		if (!existingListener) {
			this._listeners.push({ listener, signal: options?.signal });

			if (options?.signal) {
				const onAbort = (): void => this.remove(listener);
				this._abortHandlers.set(listener, onAbort);
				if (!options.signal.aborted) {
					options.signal.addEventListener('abort', onAbort, { once: true });
				} else {
					// If already aborted, immediately remove
					this.remove(listener);
				}
			}
		}
	}

	private _removeAbortHandler(listener: Listener<T>): void {
		const signal = this._listeners.find(x => x.listener === listener)?.signal;
		if (!signal) return;

		const abortHandler = this._abortHandlers.get(listener);
		if (!abortHandler) return;

		signal.removeEventListener('abort', abortHandler);
		this._abortHandlers.delete(listener);
	}

	private _addOnce(listener: Listener<T>, options?: Options): void {
		const onceListener = (arg: T): void => {
			this.remove(onceListener);
			listener(arg);
		};
		this.add(onceListener, options);
	}

	private _addOnceAsync(options?: Options): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const onceListener = (arg: T): void => {
				this.remove(onceListener);
				resolve(arg);
			};
			this.add(onceListener, options);

			// To handle a race condition between checking and subscribing to abort: add first, then check
			let finished = false;

			const onAbort = (): void => {
				if (finished) return;
				finished = true;
				this.remove(onceListener);
				reject(new DOMException('Aborted', 'AbortError'));
			};

			if (options?.signal) {
				this._abortHandlers.set(onceListener, onAbort);
				options.signal.addEventListener('abort', onAbort, { once: true });
				if (options.signal.aborted) {
					onAbort();
				}
			}
		});
	}

	public addOnce(listener: Listener<T>, options?: Options): void;
	public addOnce(options?: Options): Promise<T>;
	public addOnce(listenerOrOptions?: Listener<T> | Options, maybeOptions?: Options): Promise<T> | void {
		if (typeof listenerOrOptions === 'function') {
			return this._addOnce(listenerOrOptions, maybeOptions);
		} else {
			return this._addOnceAsync(listenerOrOptions);
		}
	}

	public remove(listener: Listener<T>): void {
		this._removeAbortHandler(listener);
		const index = this._listeners.findIndex(x => x.listener === listener);
		if (index !== -1) {
			this._listeners.splice(index, 1);
		}
	}

	public emit(arg: T): void {
		this.emitted = true;
		const listeners = [...this._listeners];
		for (const { listener } of listeners) {
			try {
				listener(arg);
			} catch (error) {
				console.error('EventEmitter listener threw an error:', error);
				setTimeout(() => {
					throw error;
				}, 0); // async "unhandled error" warning, doesn't interrupt others.
			}
		}
	}

	public removeAll(): void {
		for (const { listener } of this._listeners) {
			this._removeAbortHandler(listener);
		}
		this._listeners = [];
	}
}
