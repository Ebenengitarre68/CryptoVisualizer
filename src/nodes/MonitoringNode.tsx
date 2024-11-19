import React, { memo } from 'react';
import {
    Handle,
    Position,
    useHandleConnections,
    useNodesData,
} from '@xyflow/react';
import { type MyNode } from './utils';
import {BaseNode} from "@/components/base-node.tsx";

function MonitoringNode() {
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData = useNodesData<MyNode>(
        connections.map((connection) => connection.source),
    );


    return (
        <BaseNode
            className="node"
        >
            <Handle type="target" position={Position.Top} />
            <div>
                Incoming texts:{' '}
                {nodesData.map(({ data }:Pick<MyNode,any>, i) => <div key={i}>{ data[connections.at(i).sourceHandle]?.toString()}</div>) ||
                    'none'}
            </div>
        </BaseNode>
    );
}

export default memo(MonitoringNode);