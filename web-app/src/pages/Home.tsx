import React, { useState } from 'react';
import { ShapePalette } from '../components/ShapePalette';
import { CanvasEditor } from '../components/CanvasEditor';
import type { ToolType } from '.././model/types';

const Home: React.FC = () => {
    const [tool, setTool] = useState<ToolType>('POINT');
    const [pointsCount] = useState(2);

    return (
        <div className="home-layout">
            <ShapePalette tool={tool} setTool={setTool} canSelectRoad={pointsCount > 1} />
            <CanvasEditor tool={tool} />
        </div>
    );
};

export default Home;