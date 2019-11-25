import express from 'express'
import { runWorkflow } from './../../../ark/src/flow'

const flowDirectory = __dirname + '/flows'

export default function(app: express.Application) {

    app.get('/star', async (req: express.Request, res: express.Response) => {
        const flowFilename = flowDirectory + '/helloworld'
        const data = await runWorkflow(flowFilename)
        res.send(data)
    })

    app.get('/state', async (req: express.Request, res: express.Response) => {
        const flowFilename = flowDirectory + '/state'
        const data = await runWorkflow(flowFilename)
        res.send(data)
    })

}