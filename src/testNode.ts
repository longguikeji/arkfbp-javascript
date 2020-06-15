import { Flow, runWorkflowByClass } from './flow'
import { FlowOptions } from './flowOptions'
import { Node, NodeIDType } from './node'
import { isAsync } from './utils'

export class TestNode extends Node {

    name = 'test'

    flow?: any
    start?: NodeIDType | null | undefined
    stop?: NodeIDType | null | undefined

    outputs: any

    // tslint:disable-next-line: no-empty
    setUp() { }

    // tslint:disable-next-line: no-empty
    tearDown() { }

    async run() {
        const cls = this.constructor as typeof TestNode
        let testcases = []
        testcases = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        testcases = testcases.sort().filter((e, i, arr) => {
            if (e !== arr[i + 1] && typeof (this as any)[e] === 'function' && e.startsWith('test') && e.indexOf('SetUp') === -1 && e.indexOf('TearDown') === -1) return true
            return false
        })
        const n = testcases.length

        // tslint:disable-next-line: no-console
        console.info(`${n} testcases`)

        const flow = this.flow as typeof Flow
        const startNodeId = this.start
        const stopNodeId = this.stop

        for (let i = 0; i < n; ++i) {
            const testcase = testcases[i]
            if (testcase.indexOf('SetUp') >= 0 || testcase.indexOf('TearDown') >= 0) {
                continue
            }

            const instance = new cls()

            const testFn = (instance as any)[testcase]
            if (isAsync(testFn)) {
                // tslint:disable-next-line: no-console
                console.info(`[skip] ${testcase}`)
                continue
            }

            // setUp
            instance.setUp()

            const caseSetUpFunction = (this as any)[`${testcase}SetUp`] as Function
            if (typeof caseSetUpFunction === 'function') {
                caseSetUpFunction.bind(instance)()
            }

            // run workflow
            const flowOptions: FlowOptions = new FlowOptions()
            if (startNodeId) {
                flowOptions.startId = startNodeId
            }
            if (stopNodeId) {
                flowOptions.stopId = stopNodeId
            }

            if (typeof flow !== 'undefined') {
                const outputs = await runWorkflowByClass(flow, instance.inputs, flowOptions)
                instance.outputs = outputs
            }

            // run testcase function
            try {
                testFn.call(instance)
                // tslint:disable-next-line: no-console
                console.info(`[ok] ${testcase}`)
            } catch (error) {
                // tslint:disable-next-line: no-console
                console.info(`[fail] ${testcase}`)
                // tslint:disable-next-line: no-console
                console.info(error)
            }

            const caseTearDownFunction = (this as any)[`${testcase}TearDown`] as Function
            if (typeof caseTearDownFunction === 'function') {
                caseTearDownFunction.bind(instance)()
            }

            // tearDown
            instance.tearDown()
        }
    }
}