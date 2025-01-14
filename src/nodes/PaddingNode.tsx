import {ChangeEventHandler, memo, useEffect} from 'react';
import {
    Position,
    Handle,
    useReactFlow,
    useHandleConnections,
    useNodesData,
    type NodeProps,
} from '@xyflow/react';

import {BaseNode} from "@/components/base-node.tsx";

function PaddingNode({ id, data }: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const connectionsIn = useHandleConnections({
        type: 'target', id:'in'
    })
    const connectionsSalt = useHandleConnections({
        type: 'target',id:'salt'
    })

    const inData = useNodesData(
        connectionsIn.map((connection) => connection.source),
    )
    const saltData = useNodesData(
        connectionsSalt.map((connection) => connection.source),
    )

    useEffect(() => {
        if(connectionsSalt.length == 1 && connectionsIn.length == 1) {
            const saltNode = connectionsSalt[0];
            const salt = [...saltData[0].data[saltNode.sourceHandle]];
            const inputNode = connectionsIn[0]
            let input = [...inData[0].data[inputNode.sourceHandle]];
            const size: number = data["size"] ==  undefined ? 16 : data["size"] / 8;
            let saltOut: number[] = [];
            while (input.length < size) {
                input = input.concat(salt);
                saltOut = saltOut.concat(salt);
            }
            if ( input.length > size){
                let i:number = input.length - size;
                saltOut.splice(saltOut.length - i, i);
                input.splice(input.length - i, i);
            }

            updateNodeData(id, {bytes: input});
            updateNodeData(id, {completeSalt: saltOut});
        }
    }, [inData, saltData, data["size"]]);

    const onChange: ChangeEventHandler<HTMLSelectElement> =(evt) => {
        updateNodeData(id, {size : evt.target.value})
    };

    return (
        <BaseNode className="node tooltip ">

            <Handle
                type="target"
                id='in'
                position={Position.Top}
                isConnectable={connectionsIn.length === 0}
            />
            <span className="tooltiptext">
                Top: Msg In<br/>
                Left: Salt In<br/>
                Right: Salt Out<br/>
                Bottom: Salted Msg<br/>
            </span>
            <Handle
                type="target"
                id='salt'
                position={Position.Left}
                isConnectable={connectionsSalt.length === 0}
            />
            <div>Salting to
                <select className="select" onChange={onChange}>
                    <option value={128}>128</option>
                    <option value={256}>256</option>
                    <option value={512}>512</option>
                    <option value={1024}>1024</option>
                    <option value={2048}>2048</option>
                    <option value={1088}>1088</option>
                </select>
                bits
            </div>

            <Handle id='completeSalt' type="source" position={Position.Right}/>
            <Handle id='bytes' type="source" position={Position.Bottom}/>
        </BaseNode>
    );
}

export default memo(PaddingNode);
