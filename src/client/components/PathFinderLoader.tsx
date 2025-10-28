import { useState, useEffect } from "react";

export default function PathFinderLoader() {
  const [activeCells, setActiveCells] = useState(new Set());
  const [pathCells, setPathCells] = useState(new Set());

  const gridSize = 7;
  const totalCells = gridSize * gridSize;

  useEffect(() => {
    let mounted = true;
    let frame = 0;

    const animate = () => {
      if (!mounted) return;

      frame++;
      const cycleLength = 120;
      const progress = (frame % cycleLength) / cycleLength;

      const newActiveCells = new Set();
      const newPathCells = new Set();

      // Simulate pathfinding algorithm
      const startX = 1;
      const startY = 1;
      const endX = 6;
      const endY = 6;

      // BFS-like exploration
      const exploreCells = Math.floor(progress * 40);

      for (let i = 0; i < exploreCells; i++) {
        const angle = (i / exploreCells) * Math.PI * 2 + progress * Math.PI;
        const radius = Math.sqrt(i) * 0.8;
        const x = Math.round(startX + Math.cos(angle) * radius);
        const y = Math.round(startY + Math.sin(angle) * radius);

        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          const index = y * gridSize + x;
          newActiveCells.add(index);
        }
      }

      // Draw path after exploration
      if (progress > 0.5) {
        const pathProgress = (progress - 0.5) * 2;
        const pathLength = Math.floor(pathProgress * 10);

        for (let i = 0; i < pathLength; i++) {
          const t = i / 10;
          const x = Math.round(startX + (endX - startX) * t);
          const y = Math.round(startY + (endY - startY) * t);
          const index = y * gridSize + x;
          newPathCells.add(index);
        }
      }

      setActiveCells(newActiveCells);
      setPathCells(newPathCells);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="from-loaderBg1 via-loaderBg2 to-loaderBg1 flex min-h-screen items-center justify-center bg-gradient-to-br">
      <div className="flex flex-col items-center gap-6">
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: totalCells }).map((_, index) => {
            const isActive = activeCells.has(index);
            const isPath = pathCells.has(index);
            const isStart = index === 9; // 1,1
            const isEnd = index === 54; // 6,6

            return (
              <div
                key={index}
                className="h-7 w-7 rounded-sm transition-all duration-300"
                style={{
                  backgroundColor:
                    isStart || isEnd
                      ? "#3b82f6"
                      : isPath
                        ? "#10b981"
                        : isActive
                          ? "#6366f1"
                          : "#1e293b",
                  boxShadow: isPath
                    ? "0 0 12px rgba(16, 185, 129, 0.6)"
                    : isActive
                      ? "0 0 8px rgba(99, 102, 241, 0.4)"
                      : "none",
                  transform: isPath || isActive ? "scale(1.1)" : "scale(1)",
                  opacity:
                    isStart || isEnd ? 1 : isPath ? 0.95 : isActive ? 0.7 : 0.3,
                }}
              />
            );
          })}
        </div>

        <div className="text-sm font-medium tracking-wide text-slate-400">
          Finding your next adventure...
        </div>
      </div>
    </div>
  );
}
