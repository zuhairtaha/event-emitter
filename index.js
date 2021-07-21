/**
 * @template T
 */
export class EventEmitter {
  constructor() {
    /**
     * @private
     * @type {!Array<!Function>}
     */
    this._listeners = [];
  }

  /**
   * @param {!function(...T): void} listener
   */
  add(listener) {
    if (!this._listeners.includes(listener)) {
      this._listeners.push(listener);
    }
  }

  /**
   * @param {!function(...T): void} listener
   */
  addListener(listener) {
    this.add(listener);
  }

  /**
   * @param {!function(...T): void} listener
   */
  addEventListener(listener) {
    this.add(listener);
  }

  /**
   * @param {!function(...T): void} listener
   */
  remove(listener) {
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * @param {!function(...T): void} listener
   */
  removeListener(listener) {
    this.remove(listener);
  }

  /**
   * @param {!function(...T): void} listener
   */
  removeEventListener(listener) {
    this.remove(listener);
  }

  /**
   * @param {...T} args
   */
  emit(...args) {
    for (const listener of this._listeners) {
      listener(...args);
    }
  }

  /**
   * @param {...T} args
   */
  dispatch(...args) {
    this.emit(...args);
  }

  removeAll() {
    this._listeners = [];
  }

  removeAllListeners() {
    this.removeAll();
  }
}
