import React, { memo, useEffect } from 'react';
import { LabeledHandle } from "@/components/labeled-handle";
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

function SaltingNode({ id }: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData:Pick<MyNode, "id" | "type" | "data"> | null = useNodesData<MyNode>(connections[0]?.source);
    const textNode = isTextNode(nodesData) ? nodesData : null;

    useEffect(() => {

    }, [textNode]);

    return (
        <BaseNode className="node tooltip ">

            <Handle
                className="lable"
                type="target"
                id='in'
                position={Position.Top}
                isConnectable={connections.length === 0}
            />
            <span className="tooltiptext">
                Top: Msg In<br/>
                Left: Salt In<br/>
                Right: Salt Out<br/>
                Bottom: Salted Msg<br/>
            </span>
            <Handle
                className="lable"
                type="target"
                id='salt'
                position={Position.Left}
                isConnectable={connections.length === 0}
            />
            <div>Salting</div>
            <Handle id='completeSalt' type="source" position={Position.Right}/>
            <Handle id='bytes' type="source" position={Position.Bottom}/>
        </BaseNode>
    );
}

export default memo(SaltingNode);
