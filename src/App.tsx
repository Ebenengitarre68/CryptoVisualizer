import React, {useCallback, useRef} from 'react';
import {
  ReactFlow,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  type Edge,
  type OnConnect, MiniMap, useReactFlow, ReactFlowProvider,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import TextNode from './nodes/TextNode';
import MonitoringNode from './nodes/MonitoringNode.tsx';
import { type MyNode } from './nodes/utils';
import TextToBinaryNode from "./nodes/TextToBinaryNode.tsx";
import XorNode from "./nodes/XorNode.tsx";
import CommentNode from './nodes/CommentNode.tsx';
import BinaryToText from "./nodes/BinaryToText.tsx";

import {DnDProvider, useDnD} from "./DnDContext.tsx";
import Sidebar from "./Sidebar.tsx";

const nodeTypes = {
  text: TextNode,
  monitor: MonitoringNode,
  t2binary: TextToBinaryNode,
  xor: XorNode,
  comment: CommentNode,
  b2text: BinaryToText,
};

const initNodes: MyNode[] = [
  {
    id: 'c1',
    type: 'comment',
    data: {
      text: 'Hier könnte ihre Werbung stehen'
    },
    position: {x: 0, y: -100 },
  },
  {
    id: 't1',
    type: 'text',
    data: {
      text: 'hello'
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 't2',
    type: 'text',
    data: {
      text: 'tothe'
    },
    position: { x: 200, y: 0 },
  },
  {
    id: 't3',
    type: 'text',
    data: {
      text: 'world'
    },
    position: { x: 400, y: 0 },
  },
  {
    id: '2b1',
    type: 't2binary',
    data: {
      bytes: [0]
    },
    position: { x: 50, y: 100 },
  },
  {
    id: '2b2',
    type: 't2binary',
    data: {
      bytes: [0]
    },
    position: { x: 250, y: 100  },
  },
  {
    id: '2b3',
    type: 't2binary',
    data: {
      bytes: [0]
    },
    position: { x: 450, y: 100 },
  },
  {
    id: 'x1',
    type: 'xor',
    data: {
      bytes: [0]
    },
    position: { x: 250, y: 200 },
  },
  {
    id: 'r1',
    type: 'monitor',
    data: {},
    position: { x: 0, y: 300 },
  },
  {
    id: 'r2',
    type: 'monitor',
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

let id = 0;
const getId = () => `dndnode_${id++}`;

const CustomNodeFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes,setNodes , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();


  const onConnect: OnConnect = useCallback(
      (connection) => setEdges((eds) => addEdge(connection, eds)),
      [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
      (event) => {
        event.preventDefault();

        // check if the dropped element is valid
        if (!type) {
          return;
        }

        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: {bytes: [0] },
        };
        console.log(newNode);
        setNodes((nds) => nds.concat(newNode));
      },
      [screenToFlowPosition, type],
  );

  return (
      <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
          >
            <MiniMap zoomable pannable nodeStrokeWidth={3}/>
            <Controls/>
            <Background/>
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
  );
};


export default () => (
    <ReactFlowProvider>
      <DnDProvider>
        <CustomNodeFlow />
      </DnDProvider>
    </ReactFlowProvider>
);
