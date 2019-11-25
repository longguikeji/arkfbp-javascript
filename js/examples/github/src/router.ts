import express from 'express'

export default function(app: express.Application) {

    app.get('/', (req: express.Request, res: express.Response) => {
        res.send('hello world')
    })

}