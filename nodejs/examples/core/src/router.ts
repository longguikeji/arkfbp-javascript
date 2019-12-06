import fs from 'fs'
import express from 'express'
import { runWorkflow, importWorkflowByFile } from './../../../ark/src/flow'

import { Main as LoopFlow } from './flows/loop'
import { Main as Loop2Flow } from './flows/loop2'
import { AppState } from '../../../ark/src/appState'


function r(app: express.Application, appState: AppState, path: string, method: string, flowName: string) {
    let cb: any = async (req: express.Request, res: express.Response) => {
        const flowFilename = __dirname + '/flows' + '/' + flowName
        const ns = await importWorkflowByFile(flowFilename)
        const flow = new ns.Main({
            request: req,
            appState: appState,
        })
        const data = await runWorkflow(flow)
        res.send(data)
    }

    switch(method) {
        case 'get':
            app.get(path, cb)
            break
        case 'post':
            app.post(path, cb)
            break
    }
}


export default async function (app: express.Application, appState: AppState) {

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
                s += `${idx + 1} `

                for (let method of getMethods(r.route)) {
                    s += `[${method}]`
                }

                s += ' ' + r.route.path + '<br />'

                idx += 1
            }
        })

        res.send(s)
    })

    const routeFiles = fs.readdirSync(__dirname + '/routes')

    for (let i = 0; i < routeFiles.length; ++i) {
        const filename = routeFiles[i]
        if (filename.indexOf('.map') >= 0) {
            continue
        }

        const routes = await import(__dirname + '/routes' + '/' + filename)
        const namespace = routes.default.namespace
        routes.default.routes.forEach((route: any) => {
            for (const key in route) {
                if (typeof route[key] === 'string') {
                    r(app, appState, namespace + '/' + key, 'get', route[key])
                } else if (typeof route[key] === 'object') {
                    for (const method in route[key]) {
                        const flowName = route[key][method]
                        r(app, appState, namespace + '/' + key, method, flowName)
                    }
                }
            }
        })
    }

    // app.get('/loop', async (req: express.Request, res: express.Response) => {
    //     const flow = new LoopFlow({
    //         request: req,
    //         appState: appState,
    //     })
    //     const data = await runWorkflow(flow)

    //     // @Todo: Merge builtin response with the express res to generate final response
    //     res.send(data)
    // })

    // app.get('/loop2', async (req: express.Request, res: express.Response) => {
    //     const flow = new LoopFlow({
    //         request: req,
    //         appState: appState,
    //     })
    //     const data = await runWorkflow(flow)
    //     res.send(data)
    // })

}