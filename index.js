export class EventEmitter {
    constructor() {
        this.addListener = this.add;
        this.addEventListener = this.add;
        this.subscribe = this.add;
        this.removeListener = this.remove;
        this.removeEventListener = this.remove;
        this.unsubscribe = this.remove;
        this.dispatch = this.emit;
        this.once = this.addOnce;
        this.wait = this.addOnce;
        this._listeners = [];
        this._abortHandlers = new WeakMap();
        this.emitted = false;
    }
    add(listener, options) {
        const existingListener = this._listeners.find(x => x.listener === listener);
        if (!existingListener) {
            this._listeners.push({ listener, signal: options === null || options === void 0 ? void 0 : options.signal });
            if (options === null || options === void 0 ? void 0 : options.signal) {
                const onAbort = () => this.remove(listener);
                this._abortHandlers.set(listener, onAbort);
                if (!options.signal.aborted) {
                    options.signal.addEventListener('abort', onAbort, { once: true });
                }
                else {
                    this.remove(listener);
                }
            }
        }
    }
    _removeAbortHandler(listener) {
        var _a;
        const signal = (_a = this._listeners.find(x => x.listener === listener)) === null || _a === void 0 ? void 0 : _a.signal;
        if (!signal)
            return;
        const abortHandler = this._abortHandlers.get(listener);
        if (!abortHandler)
            return;
        signal.removeEventListener('abort', abortHandler);
        this._abortHandlers.delete(listener);
    }
    _addOnce(listener, options) {
        const onceListener = (arg) => {
            this.remove(onceListener);
            listener(arg);
        };
        this.add(onceListener, options);
    }
    _addOnceAsync(options) {
        return new Promise((resolve, reject) => {
            const onceListener = (arg) => {
                this.remove(onceListener);
                resolve(arg);
            };
            this.add(onceListener, options);
            let finished = false;
            const onAbort = () => {
                if (finished)
                    return;
                finished = true;
                this.remove(onceListener);
                reject(new DOMException('Aborted', 'AbortError'));
            };
            if (options === null || options === void 0 ? void 0 : options.signal) {
                this._abortHandlers.set(onceListener, onAbort);
                options.signal.addEventListener('abort', onAbort, { once: true });
                if (options.signal.aborted) {
                    onAbort();
                }
            }
        });
    }
    addOnce(listenerOrOptions, maybeOptions) {
        if (typeof listenerOrOptions === 'function') {
            return this._addOnce(listenerOrOptions, maybeOptions);
        }
        else {
            return this._addOnceAsync(listenerOrOptions);
        }
    }
    remove(listener) {
        this._removeAbortHandler(listener);
        const index = this._listeners.findIndex(x => x.listener === listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    }
    emit(arg) {
        this.emitted = true;
        const listeners = [...this._listeners];
        for (const { listener } of listeners) {
            try {
                listener(arg);
            }
            catch (error) {
                console.error('EventEmitter listener threw an error:', error);
                setTimeout(() => {
                    throw error;
                }, 0);
            }
        }
    }
    removeAll() {
        for (const { listener } of this._listeners) {
            this._removeAbortHandler(listener);
        }
        this._listeners = [];
    }
}
