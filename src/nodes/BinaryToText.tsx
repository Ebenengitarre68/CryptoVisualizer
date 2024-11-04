import { memo, useEffect } from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    useHandleConnections,
    useNodesData,
    type NodeProps,
} from '@xyflow/react';

import {isTextNode, type MyNode} from './utils';

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
            let data = binaryNode.data.bytes;
            for (let i = 0; i < data.length; i++) {
                result += String.fromCharCode(data[i]);
            }
            updateNodeData(id, {text: result});
        }
    }, [binaryNode]);

    return (
        <div
            style={{
                background: '#eee',
                color: '#222',
                padding: 10,
                fontSize: 12,
                borderRadius: 10,
            }}
        >
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={connections.length === 0}
            />
            <div>binary to text</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default memo(BinaryToText);
