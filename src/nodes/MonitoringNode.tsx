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
            style={{
                background: '#eee',
                color: '#222',
                padding: 10,
                fontSize: 12,
                borderRadius: 10,
            }}
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