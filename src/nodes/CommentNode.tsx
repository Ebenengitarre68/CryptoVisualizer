import React, { memo } from 'react';
import {
    type NodeProps,
    type Node, useReactFlow,
} from '@xyflow/react';
import {BaseNode} from "@/components/base-node.tsx";

function CommentNode({ id, data}: NodeProps<Node<{ text: string }>>) {
    const { updateNodeData } = useReactFlow();
    let helper:string = ""
    return data.text == null ? (
        <BaseNode
            className="node"
        >
            <input
                onChange={(evt) => helper = evt.target.value}
                value={data.text}
                style={{display: 'block'}}
            />
            <button className="node-button" onClick={()=>updateNodeData(id, {text:helper})}>Save</button>

        </BaseNode>
    ) : (
        <BaseNode
            className="node"
        >
            <div>{data.text}</div>
        </BaseNode>
    );
}

export default memo(CommentNode);