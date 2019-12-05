import express from 'express'
import { runWorkflow } from './../../../ark/src/flow'

import { Main as LoopFlow } from './flows/loop'
import { Main as Loop2Flow } from './flows/loop2'

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
        const flow = new LoopFlow({
            request: req,
        })
        const data = await runWorkflow(flow)

        // @Todo: Merge builtin response with the express res to generate final response
        res.send(data)
    })

    app.get('/loop2', async (req: express.Request, res: express.Response) => {
        const flow = new LoopFlow({
            request: req,
        })
        const data = await runWorkflow(flow)
        res.send(data)
    })

}