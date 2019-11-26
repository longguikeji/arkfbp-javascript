
// 1001: START
// 1002: STOP
// 1003: API
// 1004: Function

export default {
    entry: 1,
    nodes: [
        { id: 1, name: 'START', type: 1001, attrs: {} },
        { id: 2, name: 'API', type: 1003, attrs: {} },
        { id: 3, name: 'Function', type: 1004, attrs: {} },
        { id: 4, name: 'STOP', type: 1002, attrs: {} },
    ],
    edges: [
        { from: 1, to: 2 },
    ],
}
