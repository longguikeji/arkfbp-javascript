// import { Main } from './flows/helloworld'

// import { debug } from 'debug'

// const log = debug('mylib:randomid')

// async function x() {
//     const hello = new Main()
//     const ret = await hello.main()

//     log(ret)
// }

// x()

import express from 'express'
const app: express.Application = express()

import install from './router'
install(app)

app.listen(3000)