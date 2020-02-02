export function isAsync(fn: Function): boolean {
    return fn.constructor.name === 'AsyncFunction'
}