import { memo } from 'react';
import {
    type NodeProps,
    type Node,
} from '@xyflow/react';

function CommentNode({ data }: NodeProps<Node<{ text: string }>>) {
    return (
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