import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import install from './router'


export function serve(port: number) {
    const app: express.Application = express()

    app.use(cookieParser())
    app.use(bodyParser.json({ limit: '1mb' }))
    app.use(bodyParser.urlencoded({
        extended: true,
    }))

    install(app)

    app.listen(port, () => {
        console.info(`server started at :${port}`)
    })

}