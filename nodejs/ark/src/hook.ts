import fs from 'fs'

import { AppState } from './appState'
import { importWorkflowByFile, runWorkflow } from './flow'

export async function executeHook(appState: AppState, flowFilename: string) {
    if (fs.existsSync(flowFilename)) {
        const ns = await importWorkflowByFile(flowFilename)
        const startupFlow = new ns.Main({
            appState,
        })

        await runWorkflow(startupFlow)
    }
}
