import { memo} from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    type NodeProps,
    type Node,
} from '@xyflow/react';
import {BaseNode} from "@/components/base-node.tsx";

function TextNode({ id, data }: NodeProps<Node<{ text: string }>>) {
    const { updateNodeData } = useReactFlow();

    return (
        <BaseNode
            className="node"
        >
            <div>Text input Node</div>
            <div style={{ marginTop: 5 }}>
                <input
                    onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
                    value={data.text}
                    style={{ display: 'block' }}
                />
            </div>
            <Handle id="text" type="source" position={Position.Bottom} />
        </BaseNode>
    );
}

export default memo(TextNode);