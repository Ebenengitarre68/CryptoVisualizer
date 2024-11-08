import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

export default function ContextMenu({
                                        id,
                                        top,
                                        left,
                                        right,
                                        bottom,
                                        ...props
                                    }) {
    const {updateEdgeData , getEdge} = useReactFlow();


    const monitor = useCallback(() => {
        if (getEdge(id)?.data == null || getEdge(id)?.data?.["monitor"] == null) {
            updateEdgeData(id, {monitor: true})
        }
        else {
            updateEdgeData(id, {monitor: !getEdge(id).data["monitor"]})
        }

    }, [id]);



    return (
        <div
            style={{ top, left, right, bottom }}
            className="context-menu"
            {...props}
        >
            <button onClick={monitor}>toggle monitor</button>
        </div>
    );
}