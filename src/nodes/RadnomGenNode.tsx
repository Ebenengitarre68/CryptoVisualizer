import React, {memo, useCallback, useEffect} from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    type NodeProps,
    type Node,
} from '@xyflow/react';
import {BaseNode} from "@/components/base-node.tsx";

function RandomGenNode({ id, data }: NodeProps<Node<{ text: string }>>) {
    const { updateNodeData } = useReactFlow();
    const update = useCallback(()=>{
        if(data.length !== null){
            var buf = new Uint8Array(data.length)
        } else {
            var buf = new Uint8Array(1);
        }
        crypto.getRandomValues(buf);
        let out = [... buf]
        updateNodeData(id, {bytes:out});
    })

    return (
        <BaseNode
            className="node"
        >
            <div>Random Generator</div>
            <div style={{ marginTop: 5 }}>
                {data.bytes?.map( x => x.toString(16).toUpperCase() ).toString()}
            </div>
            <div>Length: <input type="number" min="1" style={{width:50}} onChange={e => {
                updateNodeData(id ,{length:e.target.value});
            }}/> <button className="node-button" onClick={update}>↺</button> </div>
            <Handle id="bytes" type="source" position={Position.Bottom} />
        </BaseNode>
    );
}

export default memo(RandomGenNode);