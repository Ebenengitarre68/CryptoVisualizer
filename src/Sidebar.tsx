import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">You can drag these nodes to the pane on the right. The blues bordered are input, the red bordered are output and the black are calculation</div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'text')} draggable>
                Input Node
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
        </aside>
    );
};
