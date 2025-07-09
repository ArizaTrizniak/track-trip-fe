import React, {useEffect, useRef, useState} from 'react';
import type {ToolType, Point, Road} from '../model/types';
import { useGraphStore } from '../store/graphStore';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../model/constants';
import {ExportImageButton} from "./ExportImageButton.tsx";

let idCounter = 1;

interface CanvasEditorProps {
    tool: ToolType;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({ tool }) => {

    const points = useGraphStore(state => state.points);
    const roads = useGraphStore(state => state.roads);
    const setPoints = useGraphStore(state => state.setPoints);
    const setRoads = useGraphStore(state => state.setRoads);
    const setModel = useGraphStore(state => state.setModel);
    const getModel = useGraphStore(state => state.getModel);
    const clearModel = useGraphStore(state => state.clearModel);

    const [draggedPointId, setDraggedPointId] = useState<number | null>(null);
    const [draftRoadStartId, setDraftRoadStartId] = useState<number | null>(null);
    const [dragFromPalette, setDragFromPalette] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tool !== 'ROAD' && draftRoadStartId !== null) {
            setDraftRoadStartId(null);
        }
    }, [tool, draftRoadStartId]);

    const handleDrop = (e: React.DragEvent) => {
        if (tool !== 'POINT' && !dragFromPalette) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
        setPoints([...points, { id: idCounter++, x, y }]);
        setDragFromPalette(false);
    };

    const isInsidePoint = (point: Point, x: number, y: number) =>
        (x - point.x) ** 2 + (y - point.y) ** 2 <= 100;

    const updateIdCounter = (points: Point[], roads: Road[])=> {
        const maxPointId = points.reduce((max, p) => Math.max(max, p.id), 0);
        const maxRoadId = roads.reduce((max, r) => Math.max(max, r.id), 0);
        idCounter = Math.max(maxPointId, maxRoadId) + 1;
    }

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (tool === 'ROAD' && draftRoadStartId !== null) {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const endPoint = points.find(p => isInsidePoint(p, x, y));
            if (endPoint && endPoint.id !== draftRoadStartId) {
                setRoads([...roads, { id: idCounter++, startId: draftRoadStartId, endId: endPoint.id }]);
            }
            setDraftRoadStartId(null);
        }
    };

    const handlePointMouseDown = (id: number) => {
        setDraggedPointId(id);
    };

    const handlePointClick = (id: number) => {
        if (tool === 'ROAD') setDraftRoadStartId(id);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggedPointId) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
        setPoints(points.map(p =>
            p.id === draggedPointId ? { ...p, x, y } : p
        ));
    };

    const handleMouseUp = () => {
        setDraggedPointId(null);
    };

    const handleSave = () => {
        const model = getModel();
        // You can send model to backend here!
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
        updateIdCounter(example.points, example.roads);
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
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    {roads.map(r => {
                        const start = points.find(p => p.id === r.startId);
                        const end = points.find(p => p.id === r.endId);
                        if (!start || !end) return null;
                        return <line key={r.id} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="black" strokeWidth={2} />;
                    })}

                    {points.map(p => (
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
                    ))}
                </svg>
            </div>
            <div style={{ marginTop: 12 }}>
                <button onClick={handleSave}>Save (console)</button>
                <button onClick={handleLoad}>Load Example</button>
                <button onClick={handleClear}>Clear</button>
                <ExportImageButton model ={getModel()}/>
            </div>
        </div>

    );
};
