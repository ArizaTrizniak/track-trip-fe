import React, {useEffect, useRef, useState} from 'react';
import { useGraphStore } from '../../store/graphStore.ts';
import {SERVER} from "../../utils/config.ts";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../../model/constants.ts";

export interface Props {}

export const BackgroundLayer: React.FC<Props> = () => {
    const backgroundId = useGraphStore(state => state.backgroundId);

    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!backgroundId) {
            setBgImage(null);
            return;
        }
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => setBgImage(img);
        img.src = SERVER + "/backgrounds/" + backgroundId;
    }, [backgroundId]);

    useEffect(() => {
        if (!bgCanvasRef.current) return;
        const ctx = bgCanvasRef.current.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        if (bgImage) {
            const iw = bgImage.naturalWidth;
            const ih = bgImage.naturalHeight;
            const cw = CANVAS_WIDTH;
            const ch = CANVAS_HEIGHT;
            const ir = iw / ih;
            const cr = cw / ch;
            let sx = 0, sy = 0, sw = iw, sh = ih;
            if (ir > cr) {
                sw = ih * cr;
                sx = (iw - sw) / 2;
            } else {
                sh = iw / cr;
                sy = (ih - sh) / 2;
            }
            ctx.drawImage(bgImage, sx, sy, sw, sh, 0, 0, cw, ch);
        }
    }, [bgImage, backgroundId]);

    return (
        <canvas
            ref={bgCanvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        />
    );
}