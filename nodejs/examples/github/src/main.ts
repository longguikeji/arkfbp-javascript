import bodyParser from 'body-parser'
import express from 'express'

const app: express.Application = express()

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({
    extended: true,
}))

import install from './router'
install(app)

app.listen(3000)