import spec from './spec'

import { Workflow } from '@/ark'


class NewWorkflow extends Workflow {

    // Hook
    beforeStart() { }
    afterStart() { }
    beforeStop() { }
    afterStop() { }

    // Event
    onStart() { }
    onStop() { }

    async run() {
        console.info('try again, this is my workflow run, not the base workflow')
    }

}

export default NewWorkflow;