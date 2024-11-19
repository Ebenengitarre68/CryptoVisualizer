import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
    const [_, setType] = useDnD();

    const onDragStart = (event:any, nodeType:any) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">You can drag these nodes to the pane on the left. The blues bordered are input,
                the red bordered are output and the black are calculation
            </div>
            <hr/>
            <div style={{
                    overflow: 'scroll',
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "10px",}}>
                <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'text')} draggable>
                    Text input Node
                </div>
                <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'random')} draggable>
                    Random Gen Node
                </div>
                <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'monitor')} draggable>
                    Monitor Node
                </div>
                <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'comment')} draggable>
                    Comment Node
                </div>
                <div className="dndnode" onDragStart={(event) => onDragStart(event, 'xor')} draggable>
                    Xor Node
                </div>
                <div className="dndnode" onDragStart={(event) => onDragStart(event, 't2binary')} draggable>
                    Text to Binary Node
                </div>
                <div className="dndnode" onDragStart={(event) => onDragStart(event, 'b2text')} draggable>
                    Binary to Text Node
                </div>
                <div className="dndnode" onDragStart={(event) => onDragStart(event, 'split')} draggable>
                    Split Node
                </div>
                <div className="dndnode" onDragStart={(event) => onDragStart(event, 'salt')} draggable>
                    Salting Node
                </div>
            </div>
        </aside>
    );
};
