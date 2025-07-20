import { useEffect, useState } from 'react';
import { API } from "../utils/config.ts";
import type { Background } from '../model/types.ts';


export function useBackgrounds() {
    const [backgrounds, setBackgrounds] = useState<Background[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ENDPOINT = new URL('background', API).toString();
        fetch(ENDPOINT)
            .then(res => res.json())
            .then(data => setBackgrounds(data))
            .finally(() => setLoading(false));
    }, []);

    return { backgrounds, loading };
}
