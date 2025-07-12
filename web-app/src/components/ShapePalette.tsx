import React, {useState} from 'react';
import {BackgroundGallery} from './BackgroundGallery.tsx';
import {useGraphStore} from '../store/graphStore.ts';


export const ShapePalette: React.FC = () => {

    const tool = useGraphStore(state => state.activeTool);
    const setActiveTool = useGraphStore(state => state.setActiveTool);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const setBackgroundId = useGraphStore(state => state.setBackgroundId);

    return (
        <div className="palette" style={{ position: 'relative' }}>
            <button
                className={tool === 'POINT' ? 'active' : ''}
                onClick={() => setActiveTool('POINT')}
                draggable
                aria-label="Точка"
                title="Точка"
            >
                ●
            </button>
            <button
                className={tool === 'ROAD' ? 'active' : ''}
                onClick={() => setActiveTool('ROAD')}
                aria-label="Дорога"
                title="Дорога"
            >
                <svg width="24" height="12" style={{ verticalAlign: 'middle' }}><line x1="2" y1="6" x2="22" y2="6" stroke="black" strokeWidth="3"/></svg>
            </button>
            <button
                onClick={() => setGalleryOpen((open) => !open)}
                aria-label="Фон"
                title="Выбрать фон"
                style={{ marginLeft: 6 }}
            >
                🖼️
            </button>

            {galleryOpen && (
                <BackgroundGallery
                    onPick={(id) => {
                        setGalleryOpen(false);
                        setBackgroundId(id)
                    }}
                />
            )}

        </div>
    )
};
