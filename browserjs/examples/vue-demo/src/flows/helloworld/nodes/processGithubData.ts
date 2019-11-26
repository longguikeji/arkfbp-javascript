import { FunctionNode } from '@/ark/functionNode'


export class ProcessGithubData extends FunctionNode {

    async run(): Promise<any> {
        const users = []
        for (const record of this.inputs) {
            users.push(record.login)
        }
        
        console.info(users)
        return users
    }

}