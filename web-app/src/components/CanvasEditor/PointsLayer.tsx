import React from "react";
import {useGraphStore} from "../../store/graphStore.ts";

export interface Props {
    draftRoadStartId: number | null;
    handlePointMouseDown: (id: number) => void;
    handlePointClick: (id: number) => void;
}

export const PointsLayer: React.FC<Props> = ({draftRoadStartId, handlePointClick, handlePointMouseDown}) => {

    const points = useGraphStore(state => state.points);
    const tool = useGraphStore(state => state.activeTool);

    return (
        points.map(p => (
                <circle
                    key={p.id}
                    cx={p.x}
                    cy={p.y}
                    r={10}
                    fill={tool === 'ROAD' && draftRoadStartId === p.id ? 'orange' : 'blue'}
                    stroke={tool === 'ROAD' && draftRoadStartId === p.id ? 'red' : 'black'}
                    strokeWidth={tool === 'ROAD' && draftRoadStartId === p.id ? 3 : 1}
                    onMouseDown={() => handlePointMouseDown(p.id)}
                    onClick={() => handlePointClick(p.id)}
                    style={{ cursor: 'pointer' }}
                />
            ))
    );
}
