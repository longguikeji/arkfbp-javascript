import { Node, NodeIDType, NodeType } from './node'

export class GraphNode {
  id?: NodeIDType
  cls?: NodeType
  next?: string | number
  errorNext?: string

  positiveNext?: NodeIDType
  negativeNext?: NodeIDType

  // body?: NodeIDType | [NodeIDType, NodeIDType]
  body?: NodeIDType

  constructor(id?: string, cls?: NodeType, next?: string, positiveNext?: string, negativeNext?: string) {
    this.id = id
    this.cls = cls
    this.next = next
    this.positiveNext = positiveNext
    this.negativeNext = negativeNext
  }
}