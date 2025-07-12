import React, { useState } from 'react';
import { downloadGraphImage } from '../utils/downloadGraphImage';
import {useGraphStore} from "../store/graphStore.ts";

export const ExportImageButton: React.FC= () => {
    const [loading, setLoading] = useState(false);
    const getModel = useGraphStore(state => state.getModel);

    const handleDownload = async () => {
        setLoading(true);
        try {
            await downloadGraphImage(getModel());
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
