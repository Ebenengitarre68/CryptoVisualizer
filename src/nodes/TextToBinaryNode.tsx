import { memo, useEffect } from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    useHandleConnections,
    useNodesData,
    type NodeProps,
} from '@xyflow/react';

import { isTextNode, type MyNode } from './utils';

function TextToBinaryNode({ id }: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData = useNodesData<MyNode>(connections[0]?.source);
    const textNode = isTextNode(nodesData) ? nodesData : null;

    useEffect(() => {
        updateNodeData(id, { text:  Array.from(textNode !== null ? textNode.data.text : '', char => char.charCodeAt(0))});
    }, [textNode]);

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
            <div>text to binary</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default memo(TextToBinaryNode);
