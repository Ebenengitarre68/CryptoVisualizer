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

function TextToBinaryNode({ id }: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData:Pick<MyNode, "id" | "type" | "data"> | null = useNodesData<MyNode>(connections[0]?.source);
    const textNode = isTextNode(nodesData) ? nodesData : null;

    useEffect(() => {
        updateNodeData(id, { bytes:  Array.from(textNode == null | textNode?.data?.text == null ? '' : textNode?.data.text , char => char?.charCodeAt(0))});
    }, [textNode]);

    return (
        <BaseNode
            className="node"
        >
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={connections.length === 0}
            />
            <div>Text to binary</div>
            <Handle id='bytes' type="source" position={Position.Bottom} />
        </BaseNode>
    );
}

export default memo(TextToBinaryNode);
