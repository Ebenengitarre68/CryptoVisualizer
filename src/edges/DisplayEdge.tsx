import React, {useContext, useEffect} from 'react';
import {
    BaseEdge,
    getBezierPath,
    type EdgeProps, EdgeLabelRenderer, useNodesData,
} from '@xyflow/react';


export default function DisplayEdge({
                                        data,
                                        sourceX,
                                        sourceY,
                                        targetX,
                                        targetY,
                                        sourcePosition,
                                        targetPosition,
                                        style = {},
                                        markerEnd,
                                        source,
                                        sourceHandleId
                                    }: EdgeProps) {

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return data != null && data?.["monitor"] == true ?(
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                 <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 10,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                    className="edge-label"
                >
                    {  useNodesData(source).data[sourceHandleId] == null? "":
                        typeof  useNodesData(source).data[sourceHandleId] == "string" ?
                        useNodesData(source)?.data[sourceHandleId] :
                        useNodesData(source).data[sourceHandleId].map(x => typeof x == "number" ? x.toString(16).toUpperCase() : x).toString()}
                </div>
            </EdgeLabelRenderer>
        </>
    )  :
        (
            <>
                <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            </>
        )



        ;
}