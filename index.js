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
        this.emitted = false;
    }
    add(listener, options) {
        var _a;
        const existingListener = this._listeners.find(l => l.listener === listener);
        if (!existingListener) {
            this._listeners.push({ listener, signal: options === null || options === void 0 ? void 0 : options.signal });
            (_a = options === null || options === void 0 ? void 0 : options.signal) === null || _a === void 0 ? void 0 : _a.addEventListener("abort", () => this.remove(listener));
        }
    }
    addOnce(listener, options) {
        const onceListener = (...args) => {
            this.remove(onceListener);
            listener(...args);
        };
        this.add(onceListener, options);
    }
    remove(listener) {
        const index = this._listeners.findIndex(l => l.listener === listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    }
    emit(...args) {
        this.emitted = true;
        for (const { listener } of this._listeners) {
            listener(...args);
        }
    }
    removeAll() {
        this._listeners = [];
    }
}
