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
            updateNodeData(id, { bytes: nodesData[0].data[connections.at(0).sourceHandle] });
            return;
        }
        let offset:number = 0;
        while (nodesData[offset].type == 'text'){
            offset++
        }

        let content = [...nodesData[offset].data[connections.at(0).sourceHandle]];
        for (let i:number = offset + 1; i < nodesData.length; i++) {
            if (nodesData[i].type == 'text'){continue}
            for (let j:number = 0; j < content.length; j++) {
                content[j] = content[j] ^ nodesData[i].data[connections.at(i).sourceHandle][j];
            }
        }
        updateNodeData(id, { bytes:  content});
    }, [nodesData]);

    return (
        <div
            style={{
                background: '#eee',
                color: '#222',
                fontSize: 25,
                borderRadius: 10,
            }}
        >
            <Handle
                type="target"
                position={Position.Top}
            />
            <div>⊕</div>
            <Handle id="bytes" type="source" position={Position.Bottom} />
        </div>
    );
}

export default memo(XorNode);
