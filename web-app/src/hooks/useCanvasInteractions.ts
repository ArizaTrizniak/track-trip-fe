import React, { useState, useCallback } from 'react';
import type { Point, Road } from '../model/types.ts';
import { getNextId } from "../utils/idUtils.ts";
import {useGraphStore} from "../store/graphStore.ts";

interface UseCanvasInteractionsProps {
    points: Point[];
    setPoints: (points: Point[]) => void;
    roads: Road[];
    setRoads: (roads: Road[]) => void;
    canvasRef: React.RefObject<HTMLDivElement | null>;
}

export function useCanvasInteractions({
                                          points,
                                          setPoints,
                                          roads,
                                          setRoads,
                                          canvasRef,
                                      }: UseCanvasInteractionsProps) {
    const activeTool = useGraphStore(state => state.activeTool);
    const [draggedPointId, setDraggedPointId] = useState<number | null>(null);
    const [draftRoadStartId, setDraftRoadStartId] = useState<number | null>(null);
    const [dragFromPalette, setDragFromPalette] = useState(false);

    const resetDraftRoadStartId = useCallback(() => {
        if (activeTool !== 'ROAD' && draftRoadStartId !== null) {
            setDraftRoadStartId(null);
        }
    }, [activeTool, draftRoadStartId]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        if (activeTool !== 'POINT' && !dragFromPalette) return;
        const rect = canvasRef?.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
        setPoints([...points, { id: getNextId(), x, y }]);
        setDragFromPalette(false);
    }, [activeTool, dragFromPalette, canvasRef, setPoints, points]);

    const isInsidePoint = useCallback((point: Point, x: number, y: number) =>
        (x - point.x) ** 2 + (y - point.y) ** 2 <= 100, []);

    const handleCanvasClick = useCallback((e: React.MouseEvent) => {
        if (activeTool === 'ROAD' && draftRoadStartId !== null) {
            const rect = canvasRef?.current?.getBoundingClientRect();
            if (!rect) return;
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const endPoint = points.find(p => isInsidePoint(p, x, y));
            if (endPoint && endPoint.id !== draftRoadStartId) {
                setRoads([...roads, { id: getNextId(), startId: draftRoadStartId, endId: endPoint.id }]);
            }
            setDraftRoadStartId(null);
        }
    }, [activeTool, draftRoadStartId, canvasRef, setRoads, points, roads, isInsidePoint]);

    const handlePointMouseDown = useCallback((id: number) => {
        setDraggedPointId(id);
    }, []);

    const handlePointClick = useCallback((id: number) => {
        if (activeTool === 'ROAD') setDraftRoadStartId(id);
    }, [activeTool]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!draggedPointId) return;
        const rect = canvasRef?.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
        setPoints(points.map(p =>
            p.id === draggedPointId ? { ...p, x, y } : p
        ));
    }, [draggedPointId, canvasRef, setPoints, points]);

    const handleMouseUp = useCallback(() => {
        setDraggedPointId(null);
    }, []);

    return {
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
    };
}
