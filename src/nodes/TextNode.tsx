import { memo } from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    type NodeProps,
    type Node,
} from '@xyflow/react';

function TextNode({ id, data }: NodeProps<Node<{ text: string }>>) {
    const { updateNodeData } = useReactFlow();

    return (
        <div
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
        </div>
    );
}

export default memo(TextNode);