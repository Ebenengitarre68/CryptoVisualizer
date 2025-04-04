import { memo, useEffect} from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    useHandleConnections,
    useNodesData,
    type NodeProps,
} from '@xyflow/react';

import {BaseNode} from "@/components/base-node.tsx";
import {MyNode} from "@/nodes/utils.ts";

function DePaddingNode({ id}: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connectionsIn = useHandleConnections({
        type: 'target', id:'in'
    })
    const connectionsSalt = useHandleConnections({
        type: 'target',id:'salt'
    })

    const inData = useNodesData<MyNode>(
        connectionsIn.map((connection) => connection.source),
    )
    const saltData = useNodesData(
        connectionsSalt.map((connection) => connection.source),
    )

    useEffect(() => {
        if(connectionsSalt.length == 1 && connectionsIn.length == 1) {
            if (inData[0].data[connectionsIn[0].sourceHandle] !== undefined && saltData[0].data[connectionsSalt[0].sourceHandle] !== undefined) {
                const input = [...inData[0].data[connectionsIn[0].sourceHandle]];
                const salt = [...saltData[0].data[connectionsSalt[0].sourceHandle]];
                if (input.length == 0) return
                let i: number = -1
                for (let j = 1; j <= salt.length; j++) {
                    if(salt[salt.length - j] != input[input.length - j]) {
                        break;
                    }
                    if(j == salt.length) {
                        i = input.length - j;
                    }
                }
                if (i == -1) updateNodeData(id, {bytes: input})
                if (i == input.length - salt.length) {
                    input.splice(i, salt.length);
                    updateNodeData(id, {bytes: input})
                }
            }
        }

    },[inData,saltData]);


    return (
        <BaseNode className="node tooltip ">
            <Handle
                type="target"
                id='in'
                position={Position.Top}
                isConnectable={connectionsIn.length === 0}
            />
            <span className="tooltiptext">
                Top: Padded Msg In<br/>
                Left: Padding In<br/>
                Bottom: Msg Out<br/>
            </span>
            <Handle
                type="target"
                id='salt'
                position={Position.Left}
                isConnectable={connectionsSalt.length === 0}
            />
            <div>De-Padding</div>
            <Handle id='bytes' type="source" position={Position.Bottom}/>
        </BaseNode>
    );
}

export default memo(DePaddingNode);
