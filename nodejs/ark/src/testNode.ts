import { Flow, runWorkflowByClass } from './flow'
import { Node, NodeIDType } from './node'
import { isAsync } from './utils'
import { FlowOptions } from './flowOptions'

export class TestNode extends Node {

    name = 'test'

    flow: any
    start: NodeIDType | null | undefined
    stop: NodeIDType | null | undefined

    // tslint:disable-next-line: no-empty
    setUp() { }

    // tslint:disable-next-line: no-empty
    tearDown() { }

    async run() {
        const cls = this.constructor as typeof TestNode
        let testcases = []
        testcases = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        testcases = testcases.sort().filter((e, i, arr) => {
            if (e !== arr[i + 1] && typeof (this as any)[e] === 'function' && e.startsWith('test')) return true
        })
        const n = testcases.length
        // tslint:disable-next-line: no-console
        console.info(`${n} testcases`)

        const flow = this.flow as typeof Flow
        const startNodeId = this.start
        const stopNodeId = this.stop

        for (let i = 0; i < n; ++i) {
            const testcase = testcases[i]
            const testFn = (this as any)[testcase]
            if (isAsync(testFn)) {
                // tslint:disable-next-line: no-console
                console.info(`[skip] ${testcase}`)
                continue
            }
            const instance = new cls()
            // setUp
            instance.setUp()

            // run workflow
            const inputs = {}
            const flowOptions: FlowOptions = new FlowOptions()
            if (startNodeId) {
                flowOptions.startId = startNodeId
            }
            if (stopNodeId) {
                flowOptions.stopId = stopNodeId
            }

            const outputs = await runWorkflowByClass(flow, inputs, flowOptions)

            instance.outputs = outputs

            // run testcase function
            try {
                testFn()
                // tslint:disable-next-line: no-console
                console.info(`[ok] ${testcase}`)
            } catch (error) {
                // tslint:disable-next-line: no-console
                console.info(`[fail] ${testcase}`)
            }

            // tearDown
            instance.tearDown()
        }
    }
}