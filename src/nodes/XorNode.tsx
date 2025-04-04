import { memo, useEffect } from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    useHandleConnections,
    useNodesData,
    type NodeProps,
} from '@xyflow/react';

import {  type MyNode } from './utils';
import {BaseNode} from "@/components/base-node.tsx";
import {Link} from "react-router-dom";

function XorNode({ id }: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData:Pick<MyNode, any> = useNodesData<MyNode>(
        connections.map((connection) => connection.source),
    );


    useEffect(() => {
        if(nodesData.length === 0) return;
        if(nodesData.length === 1) {
            if(nodesData[0].data[connections.at(0).sourceHandle] == undefined) {
                return;
            }
            updateNodeData(id, { bytes: nodesData[0].data[connections.at(0).sourceHandle] });
            return;
        }
        let offset:number = 0;
        while ( nodesData[offset].data == undefined
            || nodesData[offset].data[connections.at(0).sourceHandle] == undefined
            || nodesData[offset].type == 'text' ){
            offset++
            if ( offset < nodesData.length ) {
                return;
            }
        }


        if(nodesData[offset] == undefined){
            return;
        }
        let content = [...nodesData[offset].data[connections.at(0).sourceHandle]];
        for (let i:number = offset + 1; i < nodesData.length; i++) {
            if (nodesData[i].data[connections.at(i).sourceHandle] == undefined  || nodesData[i].type == 'text'){continue}
            for (let j:number = 0; j < content.length; j++) {
                content[j] = content[j] ^ nodesData[i].data[connections.at(i).sourceHandle][j];
            }
        }
        updateNodeData(id, { bytes:  content});
    }, [nodesData]);

    return (
        <BaseNode
            className="node tooltip"
            style={{fontSize: 25, padding: 4}}
        >
            <span className="tooltiptextsmall">XOR<Link target="_blank" to={"/xor"}>🛈</Link></span>
            <Handle
                type="target"
                position={Position.Top}
            />
            <div>⊕</div>
            <Handle id="bytes" type="source" position={Position.Bottom} />
        </BaseNode>
    );
}

export default memo(XorNode);
