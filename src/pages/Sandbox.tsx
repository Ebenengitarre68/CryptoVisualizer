import {ChangeEventHandler, useCallback, useEffect, useRef, useState} from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  type Edge,
  type OnConnect, MiniMap, useReactFlow, Panel, ColorMode, getViewportForBounds, getNodesBounds,
} from '@xyflow/react';
import {toPng, toSvg} from 'html-to-image';
import '@xyflow/react/dist/style.css';

import TextNode from '../nodes/TextNode.tsx';
import MonitoringNode from '../nodes/MonitoringNode.tsx';
import { type MyNode } from '../nodes/utils.ts';
import TextToBinaryNode from "../nodes/TextToBinaryNode.tsx";
import XorNode from "../nodes/XorNode.tsx";
import CommentNode from '../nodes/CommentNode.tsx';
import BinaryToText from "../nodes/BinaryToText.tsx";
import SplitNode from "../nodes/SplitNode.tsx";
import PaddingNode from "../nodes/PaddingNode.tsx";

import {DnDProvider, useDnD} from "../components/DnDContext.tsx";
import Sidebar from "../components/FlowSidebar.tsx";
import DisplayEdge from "../edges/DisplayEdge.tsx";
import ContextMenu from "../edges/ContextMenu.tsx";
import RandomGenNode from "../nodes/RadnomGenNode.tsx";
import DePaddingNode from "../nodes/DePaddingNode.tsx";
import SubBytes from "../nodes/SubBytes.tsx";
import ShiftRows from "../nodes/ShiftRows.tsx";
import InvShiftRows from "@/nodes/InvShiftRows.tsx";
import ColumnMajorOrder from "@/nodes/ColumnMajorOrder.tsx";
import InvSubBytes from "../nodes/InverseSubBytes.tsx";
import MixColumns from "@/nodes/MixColumns.tsx";
import {useWindowSize} from "@react-hook/window-size";
import '../css/sandbox.css';
import BytesNode from "@/nodes/BytesNode.tsx";

const nodeTypes = {
  text: TextNode,
  monitor: MonitoringNode,
  t2binary: TextToBinaryNode,
  xor: XorNode,
  comment: CommentNode,
  b2text: BinaryToText,
  split: SplitNode,
  random: RandomGenNode,
  pad: PaddingNode,
  dePad: DePaddingNode,
  subBytes: SubBytes,
  invSubBytes: InvSubBytes,
  shiftR: ShiftRows,
  invShiftR: InvShiftRows,
  colMajor: ColumnMajorOrder,
  mixColumns: MixColumns,
  bytesIn: BytesNode
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
    id: 'node_1',
    type: 'text',
    data: {
      text: 'Hello World'
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'node_2',
    type: 'monitor',
    data: {},
    position: { x: 38, y: 100 },
  },

];

const initEdges: Edge[] = [
  {
    id: 't1-r1',
    source: 'node_1',
    sourceHandle:'text',
    target: 'node_2',
  },
];
function downloadImage(dataUrl) {
  const a = document.createElement('a');

  a.setAttribute('download', 'algorythm.png');
  a.setAttribute('href', dataUrl);
  a.click();
}
function downloadSVG(dataUrl) {
  const a = document.createElement('a');

  a.setAttribute('download', 'algorythm.svg');
  a.setAttribute('href', dataUrl);
  a.click();
}

let id = initNodes.length;
const getId = () => `node_${id++}`;

const CustomNodeFlow = ({colorMode}:{colorMode:boolean}) => {
  const [color, setColor] = useState<ColorMode>(colorMode? "dark" : "light");
  const reactFlowWrapper = useRef(null);
  const [nodes,setNodes , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const { screenToFlowPosition, fitView } = useReactFlow();
  const [type] = useDnD();
  const [menu, setMenu] = useState(null);
  const [rfInstance, setRfInstance] = useState(null);
  const ref = useRef(null);
  const { setViewport } = useReactFlow();
  const {getNodes} = useReactFlow()
  const [ imageWidth, imageHeight] = useWindowSize()
  const onConnect: OnConnect = useCallback(
      (connection) => setEdges((eds) => addEdge(connection, eds)),
      [setEdges],
  );

  useEffect(() => { setColor(colorMode? "dark":"light") },[colorMode])

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
      setNodes(initNodes);
      setEdges(initEdges);
      fitView()
    };
    document.getElementById("algChanger").value ="default"
    restoreFlow();
  }, [setNodes, setViewport]);

  const onRestore = useCallback((path:string) => {

    const restoreFlow = async (json:string) => {
      const flow = json;
      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || [])
        fitView()
        let maxid:number = 0;
        for (const n of flow.nodes){
            if(n.id.replace(/\w*_/,"") > maxid){
              maxid = n.id.replace(/\w*_/,"")
            }
        }
        id = Number(maxid)+1
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

  const onToPng = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());




    const viewport = getViewportForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        0.5,
        2,
    );

    toPng(document.querySelector('.react-flow__viewport'), {
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  const onToSvg = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        0.5,
        2,
    );

    toSvg(document.querySelector('.react-flow__viewport'), {
      style: {
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadSVG);
  };

  const onFile = () =>{

    const restoreFlow = async (json:string) => {
      const flow = json;
      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || [])
        fitView()
        let maxid:number = 0;
        for (const n of flow.nodes){
          if(n.id.replace(/\w*_/,"") > maxid){
            maxid = n.id.replace(/\w*_/,"")
          }
        }
        id = Number(maxid)+1
      }
    };
    let reader = new FileReader()
    reader.readAsText(uploadAlg.files[0]);
    reader.onloadend = () => {
      restoreFlow(JSON.parse(reader.result));
    }

  }
  const uploadclick = ()=> uploadAlg.click()

  return (
      <div className='dndflow' onClick={onPaneClick}>
        <title>Sandbox</title>
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
              colorMode={color}
              fitView
              onEdgeContextMenu={onEdgeContextMenu}
              defaultEdgeOptions={defaultEdgeOptions}
          >
            <MiniMap zoomable pannable nodeStrokeWidth={3}/>
            <Controls/>
            <Background/>
            {menu && <ContextMenu {...menu}/>}
            <Panel position= "top-left">
              <div className="nav-div">
                <button className="nav-button left-nav-button" onClick={onEmptyNew}>Empty</button>
                <div className="download-dropdown nav-button">
                  <button className="download-drop-button" onClick={onSave}>Download</button>
                  <div className="download-dropdown-content nav-div" >
                    <div className="nav-button drop" ><button onClick={onSave}>JSON</button></div>
                    <div className="nav-button drop"><button onClick={onToPng}>PNG</button></div>
                    <div className="nav-button drop"><button onClick={onToSvg}>SVG</button></div>
                  </div>
                </div>

                <input id="uploadAlg" type={"file"} accept={".json"} onChange={onFile} style={{display: 'none'}}/>


                <select id="algChanger" onChange={onAlgChange} className="nav-button right-nav-button"
                        defaultValue="default">
                  <option value="default" hidden>Select Algorithm</option>
                  <option value="graphs/test.json">Test</option>
                  <option value="graphs/AES128R1.json">AES Round 1</option>
                  <option value="graphs/AES128Full.json">AES Full</option>
                  <option onClick={uploadclick} >Upload</option>
                </select>

              </div>
            </Panel>
            <Panel  position="top-right">
              <Sidebar/>
            </Panel>

          </ReactFlow>


        </div>

      </div>
  );
};


export default ({colorMode}) => (
      <ReactFlowProvider>
        <DnDProvider>
          <CustomNodeFlow colorMode={colorMode} />
        </DnDProvider>
      </ReactFlowProvider>
);