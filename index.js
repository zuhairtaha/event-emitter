"use strict";
exports.__esModule = true;
exports.EventEmitter = void 0;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._listeners = [];
    }
    EventEmitter.prototype.add = function (listener) {
        if (this._listeners.indexOf(listener) === -1) {
            this._listeners.push(listener);
        }
    };
    EventEmitter.prototype.remove = function (listener) {
        var index = this._listeners.indexOf(listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    };
    EventEmitter.prototype.emit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, _b = this._listeners; _a < _b.length; _a++) {
            var listener = _b[_a];
            listener.apply(void 0, args);
        }
    };
    EventEmitter.prototype.removeAll = function () {
        this._listeners = [];
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
