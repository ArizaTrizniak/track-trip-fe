import React from 'react';
import type { ToolType } from '.././model/types';

interface ShapePaletteProps {
    tool: ToolType;
    setTool: (tool: ToolType) => void;
    canSelectRoad: boolean;
}

export const ShapePalette: React.FC<ShapePaletteProps> = ({ tool, setTool, canSelectRoad }) => (
    <div className="palette">
        <button
            className={tool === 'POINT' ? 'active' : ''}
            onClick={() => setTool('POINT')}
            draggable
            aria-label="Точка"
            title="Точка"
        >
            ●
        </button>
        <button
            className={tool === 'ROAD' ? 'active' : ''}
            onClick={() => setTool('ROAD')}
            disabled={!canSelectRoad}
            aria-label="Дорога"
            title="Дорога"
        >
            <svg width="24" height="12" style={{ verticalAlign: 'middle' }}><line x1="2" y1="6" x2="22" y2="6" stroke="black" strokeWidth="3"/></svg>
        </button>
    </div>
);
