import React from "react";

import {useGraphStore} from "../../store/graphStore.ts";

export interface Props {}

export const RoadsLayer: React.FC<Props> = () => {
    const points = useGraphStore(state => state.points);
    const roads = useGraphStore(state => state.roads);

    return (
        roads.map(r => {
                const start = points.find(p => p.id === r.startId);
                const end = points.find(p => p.id === r.endId);
                if (!start || !end) return null;
                return <line key={r.id} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="black" strokeWidth={2} />;
            })
    )
}