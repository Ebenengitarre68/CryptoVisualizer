import React, {useCallback, useRef, useState} from 'react';
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
import SplitNode from "./nodes/SplitNode.tsx";

import {DnDProvider, useDnD} from "./DnDContext.tsx";
import Sidebar from "./Sidebar.tsx";
import DisplayEdge from "./edges/DisplayEdge.tsx";
import ContextMenu from "./edges/ContextMenu.tsx";

const nodeTypes = {
  text: TextNode,
  monitor: MonitoringNode,
  t2binary: TextToBinaryNode,
  xor: XorNode,
  comment: CommentNode,
  b2text: BinaryToText,
  split: SplitNode,
};

const edgeTypes = {
  display: DisplayEdge,
};

const defaultEdgeOptions = {
  animated: false,
  type: 'display',
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
    sourceHandle:'text',
    target: '2b1',
  },
  {
    id: 't2-2b2',
    source: 't2',
    sourceHandle:'text',
    target: '2b2',
  },
  {
    id: 't3-2b3',
    source: 't3',
    sourceHandle:'text',
    target: '2b3',
  },
  {
    id: '2b1-x1',
    source: '2b1',
    sourceHandle:'bytes',
    target: 'x1',
  },
  {
    id: '2b2-x1',
    source: '2b2',
    sourceHandle:'bytes',
    target: 'x1',
    type:'display',
  },
  {
    id: '2b3-x1',
    source: '2b3',
    sourceHandle:'bytes',
    target: 'x1',
  },
  {
    id: '2b1-r1',
    source: '2b1',
    sourceHandle:'bytes',
    target: 'r1',
  },
  {
    id: '2b2-r1',
    source: '2b2',
    sourceHandle:'bytes',
    target: 'r1',
  },
  {
    id: '2b3-r1',
    source: '2b3',
    sourceHandle:'bytes',
    target: 'r1',
  },
  {
    id: 'x1-r2',
    source: 'x1',
    sourceHandle:'bytes',
    target: 'r2',
  },
];

let id = initNodes.length;
const getId = () => `node_${id++}`;

const CustomNodeFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes,setNodes , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);


  const onConnect: OnConnect = useCallback(
      (connection) => setEdges((eds) => addEdge(connection, eds)),
      [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onEdgeContextMenu = useCallback(
      (event, edge) => {
        // Prevent native context menu from showing
        event.preventDefault();

        // Calculate position of the context menu. We want to make sure it
        // doesn't get positioned off-screen.
        const pane = ref.current.getBoundingClientRect();
        setMenu({
          id: edge.id,
          top: event.clientY < pane.height - 200 && event.clientY,
          left: event.clientX < pane.width - 200 && event.clientX,
          right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
          bottom:
              event.clientY >= pane.height - 200 && pane.height - event.clientY,
        });
      },
      [setMenu],
  )

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
          data: { },
        };
        setNodes((nds) => nds.concat(newNode));
      },
      [screenToFlowPosition, type],
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);


  return (
      <div className="dndflow" onClick={onPaneClick}>
        <div className="reactflow-wrapper"  ref={reactFlowWrapper}>
          <ReactFlow
              ref = {ref}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              onEdgeContextMenu={onEdgeContextMenu}
              defaultEdgeOptions={defaultEdgeOptions}
          >
            <MiniMap zoomable pannable nodeStrokeWidth={3}/>
            <Controls/>
            <Background/>
            {menu && <ContextMenu {...menu}/>}
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
