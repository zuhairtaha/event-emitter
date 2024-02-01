export class EventEmitter {
    constructor() {
        this._listeners = [];
        this.addListener = this.add;
        this.addEventListener = this.add;
        this.subscribe = this.add;
        this.removeListener = this.remove;
        this.removeEventListener = this.remove;
        this.unsubscribe = this.remove;
    }
    add(listener) {
        if (this._listeners.indexOf(listener) === -1) {
            this._listeners.push(listener);
        }
    }
    remove(listener) {
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    }
    emit(...args) {
        for (const listener of this._listeners) {
            listener(...args);
        }
    }
    removeAll() {
        this._listeners = [];
    }
}
