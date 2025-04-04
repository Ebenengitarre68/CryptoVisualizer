import {ChangeEventHandler, memo} from 'react';
import {
    Position,
    Handle,
    useReactFlow, type NodeProps, type Node,
} from '@xyflow/react';
import {BaseNode} from "@/components/base-node.tsx";

function BytesNode({ id, data }: NodeProps<Node<{ bytes: number[] }>>) {
    const { updateNodeData } = useReactFlow();

    const onChange:ChangeEventHandler<HTMLInputElement> =(evt) =>{
        const out:number[] = evt.target.value.split(',').map(function(item){
            return parseInt(item,16)
        })

        updateNodeData(id, { bytes: out })
    }
    return (
        <BaseNode
            className="node"
        >
            <div>Bytes input Node</div>
            <div>Input bytes as comma seperated Hex</div>
            <div style={{ marginTop: 5 }}>
                <input
                    onChange={onChange}
                    value={data.bytes?.map(x => isNaN(x)? "" : x.toString(16).toUpperCase())}
                    style={{ display: 'block' }}
                />
            </div>
            <Handle id="bytes" type="source" position={Position.Bottom} />
        </BaseNode>
    );
}

export default memo(BytesNode);