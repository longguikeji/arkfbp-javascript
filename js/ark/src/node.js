var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Node {
    constructor() {
        this.name = '';
        this._outputs = null;
        this._inputs = null;
        this._state = null;
        this._next = null;
        this._errorNext = null;
        this._outputs = null;
        this._state = null;
    }
    get outputs() {
        return this._outputs;
    }
    set outputs(v) {
        this._outputs = v;
    }
    get inputs() {
        return this._inputs;
    }
    set inputs(v) {
        this._inputs = v;
    }
    get state() {
        return this._state;
    }
    set state(v) {
        this._state = v;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    get next() {
        return this._next;
    }
    set next(v) {
        this._next = v;
    }
    get errorNext() {
        return this._errorNext;
    }
    set errorNext(v) {
        this._errorNext = v;
    }
}
