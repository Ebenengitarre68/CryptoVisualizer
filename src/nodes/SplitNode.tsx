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

function SplitNode({id, data}: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData:Pick<MyNode, any> = useNodesData<MyNode>(
        connections.map((connection) => connection.source),
    );
    let out:number= data.outputs === null? data.outputs : 0;
    var test:number = data.outputs * 25 + 10;


    useEffect(() => {
        //data[connections.at(i).sourceHandle]?

        //updateNodeData(id, {a: nodesData === null? [0]: nodesData.data.bytes});
    }, [nodesData]);

    return data.outputs == null?(
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

            <div style={{textAlign:"center"}}>Split Node</div>
            <div><input onChange={evt => {
                out = evt.target.value;
            }} type="number" min="2" style={{width: 50}}/> Outputs</div>
            <input type="button" value="save" onClick={()=>updateNodeData(id, {outputs:out})} />
        </div>
    ) : (
        <div
            style={{
                background: '#eee',
                color: '#222',
                padding: 10,
                fontSize: 12,
                borderRadius: 10,
                width: test,
            }}
        >
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={connections.length === 0}
            />

            <div style={{textAlign:"center"}}>Split Node</div>
        </div>
    );
}

export default memo(SplitNode);
