import React, {ChangeEventHandler, useCallback, useRef, useState} from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  type Edge,
  type OnConnect, MiniMap, useReactFlow, Panel, ColorMode,
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
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import RandomGenNode from "./nodes/RadnomGenNode.tsx";

const nodeTypes = {
  text: TextNode,
  monitor: MonitoringNode,
  t2binary: TextToBinaryNode,
  xor: XorNode,
  comment: CommentNode,
  b2text: BinaryToText,
  split: SplitNode,
  random: RandomGenNode,
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
    id: 't1',
    type: 'text',
    data: {
      text: 'Hello World'
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'r1',
    type: 'monitor',
    data: {},
    position: { x: 38, y: 100 },
  },

];

const initEdges: Edge[] = [
  {
    id: 't1-r1',
    source: 't1',
    sourceHandle:'text',
    target: 'r1',
  },
];

let id = initNodes.length;
const getId = () => `node_${id++}`;

const CustomNodeFlow = () => {
  const [colorMode] = useState<ColorMode>('light');
  const reactFlowWrapper = useRef(null);
  const [nodes,setNodes , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [menu, setMenu] = useState(null);
  const [rfInstance, setRfInstance] = useState(null);
  const ref = useRef(null);
  const { setViewport } = useReactFlow();


  const onConnect: OnConnect = useCallback(
      (connection) => setEdges((eds) => addEdge(connection, eds)),
      [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onEdgeContextMenu = useCallback((event, edge) => {
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

  const onDrop = useCallback( (event) => {
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

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const blob = new Blob([JSON.stringify(flow)],{type: 'text/json'});
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "flow.json";
      link.href = url;
      link.click();
      }
  }, [rfInstance]);

  const onEmptyNew = useCallback(() => {
    const restoreFlow = async () => {
      const x = 320;
      const y = 115;
      const zoom = 2 ;
      setNodes(initNodes);
      setEdges(initEdges);
      setViewport({ x, y, zoom });
    };
    document.getElementById("algChanger").value ="default"
    restoreFlow();
  }, [setNodes, setViewport]);

  const onRestore = useCallback((path:string) => {

    const restoreFlow = async (json:string) => {
      const flow = json;
      if (flow) {
        const {x = 0, y = 0, zoom = 1} = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({x, y, zoom});
        id = flow.nodes.length
      }
    };
    fetch(path)
        .then(response =>
          response.json()
        ).then(json => restoreFlow(json)
    )
  }, [setNodes, setViewport]);

  const onAlgChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    if(evt.target.value !== 'default'){
      onRestore(evt.target.value)
    }
  }

  return (
      <div className="dndflow" onClick={onPaneClick}>
        <div className="reactflow-wrapper"  ref={reactFlowWrapper}>

          <ReactFlow
              ref = {ref}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onInit={setRfInstance}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              colorMode={colorMode}
              fitView
              onEdgeContextMenu={onEdgeContextMenu}
              defaultEdgeOptions={defaultEdgeOptions}
          >
            <MiniMap zoomable pannable nodeStrokeWidth={3}/>
            <Controls/>
            <Background/>
            {menu && <ContextMenu {...menu}/>}
            <Panel>
              <div>
                <button className="nav-button left-nav-button" onClick={onEmptyNew}>Empty</button>
                <button className="nav-button" onClick={onSave}>Download</button>
                <select id="algChanger" onChange={onAlgChange}  className="nav-button right-nav-button" defaultValue="default">
                  <option value="default" hidden>Select Algorithm</option>
                  <option value="/graphs/test.json" >Test</option>
                </select>

              </div>
            </Panel>
          </ReactFlow>


        </div>
        <Sidebar/>
      </div>
  );
};


export default () => (
    <ReactFlowProvider>
      <DnDProvider>
        <CustomNodeFlow/>
      </DnDProvider>
    </ReactFlowProvider>
);
