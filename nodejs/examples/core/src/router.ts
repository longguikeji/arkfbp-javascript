import fs from 'fs'

import express, { response } from 'express'

import { AppState } from '../../../ark/src/appState'
import { executeHook } from '../../../ark/src/hook'
import { importWorkflowByFile, runWorkflow } from './../../../ark/src/flow'
import { Response } from './../../../ark/src/response'


function r(app: express.Application, appState: AppState, path: string, method: string, flowName: string) {
    const cb = async (req: express.Request, res: express.Response) => {
        await executeHook(appState, __dirname + '/flows/hooks/flow/beforeCreate')

        const flowFilename = __dirname + '/flows' + '/' + flowName
        const ns = await importWorkflowByFile(flowFilename)
        const r = new Response()
        const flow = new ns.Main({
            request: req,
            response: r,
            appState,
        })

        await executeHook(appState, __dirname + '/flows/hooks/flow/created')
        const data = await runWorkflow(flow)
        await executeHook(appState, __dirname + '/flows/hooks/flow/executed')

        /**
         * catefully merge the original response propertities in ark with
         */

        const flowResponse = flow.response
        /**
         * merge status code
         */
        res.status(flowResponse.status)

        /**
         * merge headers
         */
        for (const key in flowResponse.headers) {
            if (flowResponse.headers.hasOwnProperty(key)) {
                const values = flowResponse.headers[key]
                if (Array.isArray(values)) {
                    for (const value of values) {
                        res.set(key, flowResponse.headers[key])
                    }
                } else {
                    res.set(key, flowResponse.headers[key])
                }
            }
        }

        /**
         * merge data
         */
        if (flowResponse.data) {
            res.send(flowResponse.data)
        } else {
            res.send(data)
        }
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