import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import installRoutes from './router'
import { AppState } from '../../../ark/src/appState'


export function serve(port: number, appState: AppState) {
    const app: express.Application = express()

    app.use(cookieParser())
    app.use(bodyParser.json({ limit: '1mb' }))
    app.use(bodyParser.urlencoded({
        extended: true,
    }))

    installRoutes(app, appState)

    app.listen(port, () => {
        console.info(`server started at :${port}`)
    })

}