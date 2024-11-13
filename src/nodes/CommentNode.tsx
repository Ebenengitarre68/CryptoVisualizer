import React, { memo } from 'react';
import {
    type NodeProps,
    type Node, useReactFlow,
} from '@xyflow/react';

function CommentNode({ id, data}: NodeProps<Node<{ text: string }>>) {
    const { updateNodeData } = useReactFlow();
    let helper:string = ""
    return data.text == null ? (
        <div
            className="node"
        >
            <input
                onChange={(evt) => helper = evt.target.value}
                value={data.text}
                style={{display: 'block'}}
            />
            <button className="node-button" onClick={()=>updateNodeData(id, {text:helper})}>Save</button>

        </div>
    ) : (
        <div
            className="node"
        >
            {data.text}
        </div>
    );
}

export default memo(CommentNode);