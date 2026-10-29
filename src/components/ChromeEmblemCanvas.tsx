import React, { useEffect, useRef } from 'react';

export const ChromeEmblemCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.35, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 492;
    const height = 270;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const draw = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      const leftX = 38;
      const rightX = 440;
      const topY = 28;
      const bottomY = 246;
      const waistTop = 135;
      const waistBottom = 140;

      const traceBow = () => {
        ctx.beginPath();
        ctx.moveTo(leftX, topY);
        ctx.bezierCurveTo(
          leftX + 88,
          waistTop,
          rightX - 88,
          waistTop,
          rightX,
          topY
        );
        ctx.lineTo(rightX, bottomY);
        ctx.bezierCurveTo(
          rightX - 88,
          waistBottom,
          leftX + 88,
          waistBottom,
          leftX,
          bottomY
        );
        ctx.closePath();
      };

      ctx.save();
      traceBow();
      ctx.clip();

      // Base dark obsidian mirror fill
      ctx.fillStyle = '#080808';
      ctx.fillRect(leftX, topY, rightX - leftX, bottomY - topY);

      // Left wing liquid-silver specular reflection matching ref-nav-open.png
      const leftSpec = ctx.createRadialGradient(
        leftX + 55 + (px - 0.5) * 45,
        137 + (py - 0.5) * 35,
        10,
        leftX + 95,
        137,
        175
      );
      leftSpec.addColorStop(0.0, '#ffffff');
      leftSpec.addColorStop(0.32, '#ededed');
      leftSpec.addColorStop(0.62, '#787878');
      leftSpec.addColorStop(0.84, '#141414');
      leftSpec.addColorStop(1.0, '#000000');
      ctx.fillStyle = leftSpec;
      ctx.fillRect(leftX, topY, 240, bottomY - topY);

      // Center bridge & right wing chrome caustic band
      const rightBand = ctx.createLinearGradient(
        rightX - 135 + (px - 0.5) * 35,
        topY,
        rightX + 8,
        bottomY
      );
      rightBand.addColorStop(0.0, 'rgba(255,255,255,0)');
      rightBand.addColorStop(0.28, 'rgba(255,255,255,0.92)');
      rightBand.addColorStop(0.4, 'rgba(20,20,20,0.95)');
      rightBand.addColorStop(0.68, 'rgba(130,130,130,0.55)');
      rightBand.addColorStop(0.9, 'rgba(15,15,15,0.95)');
      rightBand.addColorStop(1.0, 'rgba(255,255,255,0.9)');
      ctx.fillStyle = rightBand;
      ctx.fillRect(210, topY, rightX - 210, bottomY - topY);

      // Bright metallic outer bevel rim along curves
      traceBow();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'rgba(255,255,255,0.95)';
      ctx.stroke();

      traceBow();
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(220,220,220,0.32)';
      ctx.stroke();

      ctx.restore();

      // Superscript "CK" mark at top-right of the emblem
      ctx.fillStyle = '#9c9c9c';
      ctx.font = '600 13px "Raveo Variable", sans-serif';
      ctx.fillText('CK', rightX + 12, topY - 6);

      ctx.restore();
    };

    draw();

    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerRef.current = {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
      };
      requestAnimationFrame(draw);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={492}
      height={270}
      aria-label="Chromakey metallic emblem"
      className="block w-[300px] h-[165px] md:w-[492px] md:h-[270px] select-none pointer-events-none"
    />
  );
};
