import React from 'react';
import { SERVER } from "../utils/config.ts";
import { useBackgrounds } from "../hooks/useBackgrounds.ts";

export interface Props {
    onPick(id: string): void;
}

export const BackgroundGallery: React.FC<Props> = ({onPick}) => {

    const { backgrounds, loading } = useBackgrounds();

    if (loading) return <div className="bg-gallery-dropdown">Загрузка...</div>;

    return (
        <div
            className="bg-gallery-dropdown"
            style={{
                position: 'absolute',
                left: 0,
                top: '100%',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                padding: 12,
                zIndex: 100,
                borderRadius: 8,
                width: 220,
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
            }}>
                {backgrounds.map(bg => (
                    <div
                        key={bg.id}
                        style={{
                            cursor: 'pointer',
                            border: '2px solid transparent',
                            borderRadius: 4,
                            overflow: 'hidden',
                        }}
                        onClick={() => onPick(bg.id)}
                        title={bg.id}
                    >
                        <img
                            src={SERVER + bg.previewUrl}
                            alt={bg.id}
                            style={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
