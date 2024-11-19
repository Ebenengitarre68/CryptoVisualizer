import React, { memo, useEffect } from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    useHandleConnections,
    useNodesData,
    type NodeProps,
} from '@xyflow/react';

import {isTextNode, type MyNode} from './utils';
import {BaseNode} from "@/components/base-node.tsx";

function BinaryToText({ id }: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData:Pick<MyNode, "id" | "type" | "data"> | null = useNodesData<MyNode>(connections[0]?.source);
    const binaryNode = !isTextNode(nodesData) ? nodesData : null;

    useEffect(() => {
        if(binaryNode !== null) {
            let result:string = ""
            let data = binaryNode.data[connections.at(0).sourceHandle] ;
            for (let i = 0; i < data.length; i++) {
                result += String.fromCharCode(data[i]);
            }
            updateNodeData(id, {text: result});
        }
    }, [binaryNode]);



    return (
        <BaseNode
            className="node"
        >
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={connections.length === 0}
            />
            <div>binary to text</div>
            <Handle id="text" type="source" position={Position.Bottom} />
        </BaseNode>
    );
}

export default memo(BinaryToText);
