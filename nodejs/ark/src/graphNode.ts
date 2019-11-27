import { Node, NodeIDType, NodeType } from './node'

export class GraphNode {
    id?: NodeIDType
    cls?: NodeType
    next?: string | number

    positiveNext?: NodeIDType
    negativeNext?: NodeIDType

    constructor(id?: string, cls?: NodeType, next?: string, positiveNext?: string, negativeNext?: string) {
      this.id = id
      this.cls = cls
      this.next = next
      this.positiveNext = positiveNext
      this.negativeNext = negativeNext
    }
}