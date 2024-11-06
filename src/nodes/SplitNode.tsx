import {memo, useCallback, useEffect, useMemo} from 'react';
import {
    Handle,
    type NodeProps,
    Position,
    useHandleConnections,
    useNodesData,
    useReactFlow,
    useUpdateNodeInternals,
} from '@xyflow/react';

import { type MyNode} from './utils';

function SplitNode({id, data}: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData:Pick<MyNode, any> = useNodesData<MyNode>(
        connections.map((connection) => connection.source),
    );
    let width:number = data.outputs * 25 + 5;
    const uppdateHandles = useCallback(()=>{
        if( data.out >= 2){
            updateNodeData(id, {outputs:data.out})
        } else {
            updateNodeData(id, {outputs:2})
        }
        useUpdateNodeInternals()
    })

    useEffect(() => {
        if(data.outputs != null&& nodesData.length !== 0) {
            //data[connections.at(i).sourceHandle]?
            let numOut: number = data.outputs;
            let dat = nodesData[0].data[connections.at(0).sourceHandle];
            let dataL: number = dat.length;
            let outL: number = Math.ceil(dataL / numOut);
            let numBigOut: number = dataL % numOut;
            let begin:number = 0;
            let end:number = outL;
            for (let i:number = 0; i < numOut; i++) {
                let update : string = "out"+i
                updateNodeData(id,   { [update] : dat.slice(begin,end)});
                begin = end;
                end = numBigOut == 0 || i + 1 < numBigOut ? end + outL : end + outL -1;
            }
        }
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
                data.out = evt.target.value;
            }} type="number" min="2" style={{width: 50}}/> Outputs (min 2)</div>
            <input type="button" value="save" onClick={ uppdateHandles } />
        </div>
    ) : (
        <div
            style={{
                background: '#eee',
                color: '#222',
                padding: 10,
                fontSize: 12,
                borderRadius: 10,
                width: width,
            }}
        >
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={connections.length === 0}
            />

            <div style={{textAlign:"center"}}>Split Node</div>
            {Array.from({ length:data.outputs}).map((_:unknown,index:number) => {
                let helper:number = index * 25 + 25;
                data[String(index)]=[];
                return (<Handle
                type="source"
                position={Position.Bottom}
                id={"out"+String(index)}
                style={{left: helper}}
                />)
            })}
        </div>
    );
}

export default memo(SplitNode);
