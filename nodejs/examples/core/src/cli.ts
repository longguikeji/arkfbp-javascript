import { Argv } from "yargs"
import { runWorkflowByFile } from './../../../ark/src/flow'
import { serve } from './server'


import { ark } from './../../../ark/src'
import Logger from './plugins/log'

ark.registerPlugin(Logger)


function startServer(port: string) {
    console.info(`Serve on port ${port}.`);
    serve(Number(port))
}

require('yargs')
    .command('run', 'run workflow', (yargs: Argv) => {
        yargs.option('name', {
            describe: 'Workflow to execute',
        }).option('inputs', {
            default: null,
            describe: 'Data to set as the inputs',
        })
    }, (args: any) => {
        const flowDirectory = __dirname + '/flows'
        const flowFilename = flowDirectory + '/' + args.name
        const inputs = args.inputs
        runWorkflowByFile(flowFilename, inputs).then((data) => {
            console.info(data)
        })
    })
    .command('serve', "Start the server.", (yargs: Argv) => {
        yargs.option('port', {
            describe: "Port to bind on",
            default: "3000",
        }).option('verbose', {
            alias: 'v',
            default: false,
        })
    }, (args: any) => {
        if (args.verbose) {
            console.info("Starting the server...");
        }

        startServer(args.port);
    }).argv;