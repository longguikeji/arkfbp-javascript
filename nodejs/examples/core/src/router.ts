import fs from 'fs'

import express from 'express'

import { AppState } from '../../../ark/src/appState'
import { importWorkflowByFile, runWorkflow } from './../../../ark/src/flow'

function r(app: express.Application, appState: AppState, path: string, method: string, flowName: string) {
    const cb = async (req: express.Request, res: express.Response) => {
        const flowFilename = __dirname + '/flows' + '/' + flowName
        const ns = await importWorkflowByFile(flowFilename)
        const flow = new ns.Main({
            request: req,
            appState,
        })
        const data = await runWorkflow(flow)
        res.send(data)
    }

    switch (method) {
        case 'get':
            app.get(path, cb)
            break
        case 'post':
            app.post(path, cb)
            break
        default:
            return
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
                if (r.methods.hasOwnProperty(method)) {
                    methods.push(method.toUpperCase())
                }
            }

            return methods
        }

        app._router.stack.forEach((r: any) => {
            if (r.route && r.route.path) {
                s += `${idx + 1} `

                for (const method of getMethods(r.route)) {
                    s += `[${method}]`
                }

                s += ' ' + r.route.path + '<br />'

                idx += 1
            }
        })

        res.send(s)
    })

    const routeFiles = fs.readdirSync(__dirname + '/routes')
    for (const filename of routeFiles) {
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
                        if (route[key].hasOwnProperty(method)) {
                            const flowName = route[key][method]
                            r(app, appState, namespace + '/' + key, method, flowName)
                        }
                    }
                }
            }
        })
    }
}