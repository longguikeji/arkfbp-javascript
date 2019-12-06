import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import installRoutes from './router'
import { AppState } from '../../../ark/src/appState'
import formidableMiddleware from 'express-formidable'


export async function serve(port: number, appState: AppState) {
    const app: express.Application = express()

    app.use(cookieParser())
    app.use(formidableMiddleware())
    app.use(bodyParser.json({ limit: '1mb' }))
    app.use(bodyParser.urlencoded({
        extended: true,
    }))

    await installRoutes(app, appState).catch((error)=> {
        console.info(error)
    })

    app.listen(port, () => {
        console.info(`server started at :${port}`)
    })

}