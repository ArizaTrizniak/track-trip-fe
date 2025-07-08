import React, { useState } from 'react';
import { downloadGraphImage } from '../utils/downloadGraphImage';
import type { GraphModel } from '../model/types.ts';

export const ExportImageButton: React.FC<{ model: GraphModel }> = ({ model }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            await downloadGraphImage(model);
        } catch {
            alert('Could not download image!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleDownload} disabled={loading}>
            {loading ? 'Generating...' : 'Download Image'}
        </button>
    );
};
