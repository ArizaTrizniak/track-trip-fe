import React from 'react';
import { ShapePalette } from '../components/ShapePalette';
import { CanvasEditor } from '../components/CanvasEditor/CanvasEditor.tsx';

const Home: React.FC = () => {

    return (
        <div className="home-layout">
            <ShapePalette />
            <CanvasEditor />
        </div>
    );
};

export default Home;