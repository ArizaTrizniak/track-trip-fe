import { useState } from 'react';
import type { Point, Road, GraphModel } from '.././model/types';
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../model/constants.ts";

export function useGraphModel() {
    const [points, setPoints] = useState<Point[]>([]);
    const [roads, setRoads] = useState<Road[]>([]);

    const getModel = (): GraphModel => ({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        points,
        roads,
    });

    const setModel = (model: GraphModel) => {
        setPoints(model.points);
        setRoads(model.roads);
    };


    const clearModel = () => {
        setPoints([]);
        setRoads([]);
    };

    return {
        points,
        setPoints,
        roads,
        setRoads,
        getModel,
        setModel,
        clearModel,
    };
}
