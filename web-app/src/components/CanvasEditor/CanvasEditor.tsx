import React, { useEffect, useRef } from 'react';
import { useGraphStore } from '../../store/graphStore.ts';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../model/constants.ts';
import { ExportImageButton } from "../ExportImageButton.tsx";
import { BackgroundLayer } from "./BackgroundLayer.tsx";
import { PointsLayer } from "./PointsLayer.tsx";
import { RoadsLayer } from "./RoadsLayer.tsx";
import { setInitialId} from "../../utils/idUtils.ts";
import { useCanvasInteractions } from '../../hooks/useCanvasInteractions.ts';

export const CanvasEditor: React.FC = () => {
    const activeTool = useGraphStore(state => state.activeTool);
    const points = useGraphStore(state => state.points);
    const roads = useGraphStore(state => state.roads);
    const setPoints = useGraphStore(state => state.setPoints);
    const setRoads = useGraphStore(state => state.setRoads);
    const setModel = useGraphStore(state => state.setModel);
    const getModel = useGraphStore(state => state.getModel);
    const clearModel = useGraphStore(state => state.clearModel);

    const canvasRef = useRef<HTMLDivElement>(null);

    const {
        draftRoadStartId,
        setDraggedPointId,
        setDraftRoadStartId,
        handleDrop,
        handleCanvasClick,
        handlePointMouseDown,
        handlePointClick,
        handleMouseMove,
        handleMouseUp,
        resetDraftRoadStartId,
    } = useCanvasInteractions({
        points, setPoints, roads, setRoads, canvasRef,
    });

    useEffect(() => {
        resetDraftRoadStartId();
    }, [activeTool, draftRoadStartId]);

    const handleSave = () => {
        const model = getModel();
        console.log('Save model:', model);
    };

    const handleLoad = () => {
        const example = {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            points: [{ id: 1, x: 100, y: 100 }, { id: 2, x: 200, y: 120 }],
            roads: [{ id: 3, startId: 1, endId: 2 }]
        };
        setModel(example);
        setInitialId(example.points, example.roads);
    };

    const handleClear = () => {
        clearModel();
        setDraftRoadStartId(null);
        setDraggedPointId(null);
    };

    return (
        <div className="canvas-container">
            <div
                ref={canvasRef}
                className="canvas-editor"
                tabIndex={0}
                onClick={handleCanvasClick}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, border: '1px solid #333', position: 'relative', outline: 'none' }}
            >
               <BackgroundLayer />
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                    <RoadsLayer />
                    <PointsLayer
                        draftRoadStartId={draftRoadStartId}
                        handlePointMouseDown={handlePointMouseDown}
                        handlePointClick={handlePointClick}
                    />
                </svg>
            </div>
            <div style={{ marginTop: 12 }}>
                <button onClick={handleSave}>Save (console)</button>
                <button onClick={handleLoad}>Load Example</button>
                <button onClick={handleClear}>Clear</button>
                <ExportImageButton/>
            </div>
        </div>
    );
};
