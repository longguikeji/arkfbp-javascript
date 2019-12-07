import { AppState } from './appState'
import { Response } from './response'

export class FlowOptions {

    /**
     * request object from expressjs
     */
    request?: any
    response?: Response

    appState?: AppState
}