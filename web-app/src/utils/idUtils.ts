let globalIdCounter = 1;

export function getNextId(): number {
    return globalIdCounter++;
}

export function setInitialId(points: { id: number }[], roads: { id: number }[]) {
    const maxPointId = points.reduce((max, p) => Math.max(max, p.id), 0);
    const maxRoadId = roads.reduce((max, r) => Math.max(max, r.id), 0);
    globalIdCounter = Math.max(maxPointId, maxRoadId) + 1;
}
