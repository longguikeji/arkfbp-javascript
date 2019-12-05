import { Ark } from './../../../../ark/src/index'
import { debug } from 'debug'


export default function install(ark: Ark, options: any) {
    Object.defineProperty(Ark.prototype, "logger", {
        get: function () {
            return debug
        },
        enumerable: true,
        configurable: true
    });

}