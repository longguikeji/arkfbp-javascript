export class Ark {

    private _plugin: any

    get plugin() {
        return this._plugin
    }

    set plugin(v: any) {
        this._plugin = v
    }

    hello() {
        console.info('hello world')
    }

    registerPlugin(plugin: any, options?: any) {
        plugin(this, options)
    }

}

export const ark = new Ark()
