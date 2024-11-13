import { memo } from 'react';
import {
    Handle,
    Position,
    useHandleConnections,
    useNodesData,
} from '@xyflow/react';
import { type MyNode } from './utils';

function MonitoringNode() {
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData = useNodesData<MyNode>(
        connections.map((connection) => connection.source),
    );


    return (
        <div
            className="node"
        >
            <Handle type="target" position={Position.Top} />
            <div>
                Incoming texts:{' '}
                {nodesData.map(({ data }:Pick<MyNode,any>, i) => <div key={i}>{ data[connections.at(i).sourceHandle]?.toString()}</div>) ||
                    'none'}
            </div>
        </div>
    );
}

export default memo(MonitoringNode);