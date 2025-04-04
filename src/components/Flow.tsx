import {useCallback, useEffect, useRef, useState} from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Background,
    type Edge,
    type OnConnect, useReactFlow,  ColorMode
} from '@xyflow/react';
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

import DisplayEdge from "../edges/DisplayEdge.tsx"
import ContextMenu from "../edges/ContextMenu.tsx"
import RandomGenNode from "../nodes/RadnomGenNode.tsx";
import DePaddingNode from "../nodes/DePaddingNode.tsx";
import SubBytes from "../nodes/SubBytes.tsx";
import ShiftRows from "../nodes/ShiftRows.tsx";
import InvShiftRows from "@/nodes/InvShiftRows.tsx";
import ColumnMajorOrder from "@/nodes/ColumnMajorOrder.tsx";
import InvSubBytes from "../nodes/InverseSubBytes.tsx";
import MixColumns from "@/nodes/MixColumns.tsx";
import BytesNode from "../nodes/BytesNode.tsx";
import '../css/flow.css';

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


const CustomNodeFlow = ({colorMode , flow}) => {
    const [color, setColor] = useState<ColorMode>(colorMode? "dark" : "light");
    const reactFlowWrapper = useRef(null);
    const [nodes,setNodes , onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
    const { screenToFlowPosition, fitView } = useReactFlow();
    const [menu, setMenu] = useState(null);
    const [rfInstance, setRfInstance] = useState(null);
    const ref = useRef(null);
    const { setViewport } = useReactFlow();
    const {getNodes} = useReactFlow()

    const {updateEdgeData , getEdge} = useReactFlow();
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


            if (getEdge(edge.id)?.data == null || getEdge(edge.id)?.data?.["monitor"] == null) {
                updateEdgeData(edge.id, {monitor: true})
            }
            else {
                updateEdgeData(edge.id, {monitor: !getEdge(edge.id).data["monitor"]})
            }
        },
        [setMenu],
    )



    // Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => setMenu(null), [setMenu]);


    const onRestore = useCallback((path:string) => {

        const restoreFlow = async (json:string) => {
            const flow = json;
            if (flow) {
                setNodes(flow.nodes || []);
                setEdges(flow.edges || [])
                fitView()
                id = flow.nodes.length
            }
        };
        fetch(path)
            .then(response =>
                response.json()
            ).then(json => restoreFlow(json)
        )
    }, [setNodes, setViewport]);

    useEffect(() => {
        onRestore(flow)
    }, [flow]);


    return (
        <div className='example_dndflow' onClick={onPaneClick}>
            <div className="example_reactflow-wrapper"  ref={reactFlowWrapper}>
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
                    onDragOver={onDragOver}
                    colorMode={color}
                    fitView
                    onEdgeContextMenu={onEdgeContextMenu}
                    defaultEdgeOptions={defaultEdgeOptions}
                >
                    <Background/>
                    {menu && <ContextMenu {...menu}/>}
                </ReactFlow>


            </div>

        </div>
    );
};


export default ({colorMode , flow}) => (
    <ReactFlowProvider>
        <CustomNodeFlow colorMode={colorMode} flow={flow} />
    </ReactFlowProvider>
);