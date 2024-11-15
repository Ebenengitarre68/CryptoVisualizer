import {memo, useCallback, useEffect} from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    type NodeProps,
    type Node,
} from '@xyflow/react';

function RandomGenNode({ id, data }: NodeProps<Node<{ text: string }>>) {
    const { updateNodeData } = useReactFlow();
    useEffect(() => {
    }, []);
    const update = useCallback(()=>{
        if(data.length !== null){
            var buf = new Uint8Array(data.length)
        } else {
            var buf = new Uint8Array(1);
        }
        crypto.getRandomValues(buf);
        updateNodeData(id, {bytes:buf});
    })
    return (
        <div
            className="node"
        >
            <div>Random Generator</div>
            <div style={{ marginTop: 5 }}>
                {data.bytes?.toString()}
            </div>
            <div>Length: <input type="number" min="1" style={{width:50}} onChange={e => {
                updateNodeData(id ,{length:e.target.value});
            }}/> <button className="node-button" onClick={update}>↺</button> </div>
            <Handle id="bytes" type="source" position={Position.Bottom} />
        </div>
    );
}

export default memo(RandomGenNode);