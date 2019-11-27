import express from 'express'
import { runWorkflow } from './../../../ark/src/flow'

const flowDirectory = __dirname + '/flows'

export default function(app: express.Application) {

    app.get('/loop', async (req: express.Request, res: express.Response) => {
        const flowFilename = flowDirectory + '/loop'
        const data = await runWorkflow(flowFilename)
        res.send(data)
    })

}