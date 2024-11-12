import React, { memo, useEffect,useState } from 'react';
import {
    type NodeProps,
    type Node, useReactFlow,
} from '@xyflow/react';

function CommentNode({ id, data}: NodeProps<Node<{ text: string }>>) {
    const { updateNodeData } = useReactFlow();
    let helper:string = ""
    return data.text == null ? (
        <div
            style={{
                background: '#eee',
                color: '#222',
                padding: 10,
                fontSize: 12,
                borderRadius: 10,
            }}
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
            style={{
                background: '#eee',
                color: '#222',
                padding: 10,
                fontSize: 12,
                borderRadius: 10,
            }}
        >
            {data.text}
        </div>
    );
}

export default memo(CommentNode);