export type ToolType = 'POINT' | 'ROAD';

export interface Point {
    id: number;
    x: number;
    y: number;
    label?: string;
    color?: string;
}

export interface Road {
    id: number;
    startId: number;
    endId: number;
    color?: string;
    lineWidth?: number;
    type?: string;
}

export interface GraphModel {
    width: number;
    height: number;
    points: Point[];
    roads: Road[];
    backgroundColor?: string;
}