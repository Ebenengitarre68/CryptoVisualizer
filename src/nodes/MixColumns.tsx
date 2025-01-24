import React, {ChangeEventHandler, memo, useEffect } from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    useHandleConnections,
    useNodesData,
    type NodeProps,
} from '@xyflow/react';

import {type MyNode} from './utils';
import {BaseNode} from "@/components/base-node.tsx";

function MixColumns({ id, data }: NodeProps) {

    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData:Pick<MyNode, "id" | "type" | "data"> | null = useNodesData<MyNode>(connections[0]?.source);

    useEffect(() => {
        let mode:number = 0;
        if (data["mode"] != null){
            mode = data["mode"];
        }
        if(nodesData !== null) {
            let data = nodesData.data[connections.at(0).sourceHandle];
            let out = [...data];
            if(data.length== 16){
                switch (mode) {
                    case 0:
                        //AES MIX COLUMNS
                        for (let c:number = 0; c<4; c++) {
                            let a = new Array(4);
                            let b = new Array(4);
                            for (let i:number = 0; i < 4; i++) {
                                a[i] = out[i + c * 4];
                                b[i] = out[i + c * 4] & 0x80 ? out[i + c * 4]<<1 ^ 0x011b : out[i + c * 4]<<1;
                            }
                            out[0 + c * 4] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
                            out[1 + c * 4] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
                            out[2 + c * 4] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
                            out[3 + c * 4] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3];
                        }
                        break;
                    default:
                }
            }
            updateNodeData(id, {bytes: out});
        }

    }, [nodesData, data["mode"]]);

    const onChange: ChangeEventHandler<HTMLSelectElement> =(evt) => {
        updateNodeData(id, {mode : evt.target.value})
    };

    return (
        <BaseNode
            className="node"
        >
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={connections.length === 0}
            />
            <div style={{ display:"flex", justifyContent:"center"}}>Mix Columns</div>
            <div>
                <select className="select" onChange={onChange}>
                    <option value={0}>AES</option>
                </select>
            </div>
            <Handle id="bytes" type="source" position={Position.Bottom}/>
        </BaseNode>
    );
}

export default memo(MixColumns);
