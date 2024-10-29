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

const nodeTypes = {
  text: TextNode,
  result: ResultNode,
  t2binary: TextToBinaryNode,
};

const initNodes: MyNode[] = [
  {
    id: '1',
    type: 'text',
    data: {
      text: 'hello',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'text',
    data: {
      text: 'world',
    },
    position: { x: 200, y: 0 },
  },
  {
    id: '3',
    type: 't2binary',
    data: { text: '' },
    position: { x: 50, y: 100 },
  },
  {
    id: '4',
    type: 't2binary',
    data: { text: '' },
    position: { x: 250, y: 100 },
  },
  {
    id: '5',
    type: 'result',
    data: {},
    position: { x: 130, y: 200 },
  },
];

const initEdges: Edge[] = [
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
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
