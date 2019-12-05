import express from 'express'
import { runWorkflow } from './../../../ark/src/flow'

import { Main as LoopFlow } from './flows/loop'
import { Main as Loop2Flow } from './flows/loop2'

// const flowDirectory = __dirname + '/flows'

export default function (app: express.Application) {

    app.get('/_routes/', async (req: express.Request, res: express.Response) => {
        let s = ''
        let idx = 0

        const routes: string[] = []

        function getMethods(r: any) {
            const methods = []
            for (const method in r.methods) {
                methods.push(method.toUpperCase())
            }

            return methods
        }

        app._router.stack.forEach((r: any) => {
            if (r.route && r.route.path) {
                s += `${idx+1} `

                for (let method of getMethods(r.route)) {
                    s += `[${method}]`
                }

                s += ' ' + r.route.path + '<br />'

                idx += 1
            }
        })

        res.send(s)
    })

    app.get('/loop', async (req: express.Request, res: express.Response) => {
        // const flowFilename = flowDirectory + '/loop'
        // const data = await runWorkflow(flowFilename)
        const flow = new LoopFlow(req)
        const data = await runWorkflow(flow)
        res.send(data)
    })

    app.get('/loop2', async (req: express.Request, res: express.Response) => {
        const flow = new LoopFlow(req)
        const data = await runWorkflow(flow)
        res.send(data)
    })

}