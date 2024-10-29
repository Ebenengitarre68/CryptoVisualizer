import { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  type Edge,
  type OnConnect, MiniMap,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import TextNode from './nodes/TextNode';
import ResultNode from './nodes/ResultNode';
import { type MyNode } from './nodes/utils';
import TextToBinaryNode from "./nodes/TextToBinaryNode.tsx";
import XorNode from "./nodes/XorNode.tsx";

const nodeTypes = {
  text: TextNode,
  result: ResultNode,
  t2binary: TextToBinaryNode,
  xor: XorNode,
};

const initNodes: MyNode[] = [
  {
    id: 't1',
    type: 'text',
    data: {
      text: 'hello',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 't2',
    type: 'text',
    data: {
      text: 'tothe',
    },
    position: { x: 200, y: 0 },
  },
  {
    id: 't3',
    type: 'text',
    data: {
      text: 'world',
    },
    position: { x: 400, y: 0 },
  },
  {
    id: '2b1',
    type: 't2binary',
    data: { bytes: [0] },
    position: { x: 50, y: 100 },
  },
  {
    id: '2b2',
    type: 't2binary',
    data: { bytes: [0] },
    position: { x: 250, y: 100  },
  },
  {
    id: '2b3',
    type: 't2binary',
    data: { bytes: [0] },
    position: { x: 450, y: 100 },
  },
  {
    id: 'x1',
    type: 'xor',
    data: { bytes: [0] },
    position: { x: 250, y: 200 },
  },
  {
    id: 'r1',
    type: 'result',
    data: {},
    position: { x: 0, y: 300 },
  },
  {
    id: 'r2',
    type: 'result',
    data: {},
    position: { x: 200, y: 300 },
  },
];

const initEdges: Edge[] = [
  {
    id: 't1-2b1',
    source: 't1',
    target: '2b1',
  },
  {
    id: 't2-2b2',
    source: 't2',
    target: '2b2',
  },
  {
    id: 't3-2b3',
    source: 't3',
    target: '2b3',
  },
  {
    id: '2b1-x1',
    source: '2b1',
    target: 'x1',
  },
  {
    id: '2b2-x1',
    source: '2b2',
    target: 'x1',
  },
  {
    id: '2b3-x1',
    source: '2b3',
    target: 'x1',
  },
  {
    id: '2b1-r1',
    source: '2b1',
    target: 'r1',
  },
  {
    id: '2b2-r1',
    source: '2b2',
    target: 'r1',
  },
  {
    id: '2b3-r1',
    source: '2b3',
    target: 'r1',
  },
  {
    id: 'x1-r2',
    source: 'x1',
    target: 'r2',
  },
];

const CustomNodeFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect: OnConnect = useCallback(
      (connection) => setEdges((eds) => addEdge(connection, eds)),
      [setEdges],
  );

  return (
      <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
      >
        <MiniMap zoomable pannable nodeStrokeWidth={3} />
        <Controls />
        <Background />
      </ReactFlow>
  );
};

export default CustomNodeFlow;
