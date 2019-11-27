import bodyParser from 'body-parser'
import express from 'express'

const app: express.Application = express()

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({
    extended: true,
}))

import install from './router'
install(app)

const port = 3000
app.listen(port, () => {
    console.info(`server started at :${port}`)
})