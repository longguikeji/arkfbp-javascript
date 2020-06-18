import { Node, NodeIDType, NodeType } from './node'

export class GraphNode {
  id?: NodeIDType
  cls?: NodeType

  next?: NodeIDType
  errorNext?: NodeIDType

  positiveNext?: NodeIDType
  negativeNext?: NodeIDType

  // body?: NodeIDType | [NodeIDType, NodeIDType]
  body?: NodeIDType

  route?: any

  constructor(id?: NodeIDType, cls?: NodeType, next?: NodeIDType, positiveNext?: NodeIDType, negativeNext?: NodeIDType) {
    this.id = id
    this.cls = cls
    this.next = next
    this.positiveNext = positiveNext
    this.negativeNext = negativeNext
  }
}