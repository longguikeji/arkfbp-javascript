import { APINode } from './../../../../../../ark/src/apiNode'

import { debug } from 'debug'

const log = debug('mylib:randomid')

export class Node2 extends APINode {

    url = 'https://api.github.com/repos/longguikeji/arkid-core/stargazers'

}