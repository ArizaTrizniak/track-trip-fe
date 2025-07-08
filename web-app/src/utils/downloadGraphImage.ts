import type { GraphModel } from '../model/types';

const DEFAULT_ENDPOINT = 'http://localhost:3000/image';

export async function downloadGraphImage(model: GraphModel,
                                         endpoint = DEFAULT_ENDPOINT) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    });
    if (!response.ok) {
        throw new Error('Failed to generate image');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'graph.png';
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => window.URL.revokeObjectURL(url), 500);
}
