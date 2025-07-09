import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Point, Road, GraphModel } from '../model/types';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../model/constants';

interface GraphStore {
    points: Point[];
    roads: Road[];
    width: number;
    height: number;
    backgroundColor?: string;
    setPoints: (points: Point[]) => void;
    setRoads: (roads: Road[]) => void;
    setModel: (model: GraphModel) => void;
    clearModel: () => void;
    getModel: () => GraphModel;
    setBackgroundColor: (color: string) => void;
}

export const useGraphStore = create<GraphStore>()(
    persist(
        (set, get) => ({
            points: [],
            roads: [],
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            backgroundColor: undefined,
            setPoints: (points) => set({ points }),
            setRoads: (roads) => set({ roads }),
            setBackgroundColor: (color) => set({ backgroundColor: color }),
            setModel: (model) =>
                set({
                    points: model.points,
                    roads: model.roads,
                    width: model.width,
                    height: model.height,
                    backgroundColor: model.backgroundColor,
                }),
            clearModel: () =>
                set({
                    points: [],
                    roads: [],
                    width: CANVAS_WIDTH,
                    height: CANVAS_HEIGHT,
                    backgroundColor: undefined,
                }),
            getModel: () => ({
                width: get().width,
                height: get().height,
                points: get().points,
                roads: get().roads,
                backgroundColor: get().backgroundColor,
            }),
        }),
        {
            name: 'graph-model',
            partialize: (state) => ({
                points: state.points,
                roads: state.roads,
                width: state.width,
                height: state.height,
                backgroundColor: state.backgroundColor,
            }),
        }
    )
);
