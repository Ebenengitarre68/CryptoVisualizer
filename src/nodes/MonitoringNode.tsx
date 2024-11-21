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
                {nodesData.map(({ data }:Pick<MyNode,any>, i) =>
                        <div key={i}>{ Array.isArray( data[connections.at(i).sourceHandle] ) ?
                            data[connections.at(i).sourceHandle].map(x => typeof x == "number"? x.toString(16).toUpperCase() : x ).toString()
                            : data[connections.at(i).sourceHandle]?.toString()}</div>) ||
                    'none'}
            </div>
        </BaseNode>
    );
}

export default memo(MonitoringNode);