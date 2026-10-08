import { useEffect, useRef } from 'react';

interface Node {
  label: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  baseRadius: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
}

export default function TrustNetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    const centerX = () => width / 2;
    const centerY = () => height / 2;

    const initNodes = () => {
      const cx = centerX();
      const cy = centerY();
      const orbitR = Math.min(width, height) * 0.3;

      const peripheralLabels = ['Fiscal', 'Juridique', 'Assurance', 'Financier'];
      const peripheralAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

      nodesRef.current = [
        ...peripheralLabels.map((label, i) => ({
          label,
          x: cx + Math.cos(peripheralAngles[i]) * orbitR,
          y: cy + Math.sin(peripheralAngles[i]) * orbitR,
          baseX: cx + Math.cos(peripheralAngles[i]) * orbitR,
          baseY: cy + Math.sin(peripheralAngles[i]) * orbitR,
          baseRadius: Math.min(width, height) * 0.065,
          angle: peripheralAngles[i],
          orbitRadius: orbitR,
          orbitSpeed: 0.0003 + i * 0.0001,
        })),
        {
          label: 'FIDES',
          x: cx,
          y: cy,
          baseX: cx,
          baseY: cy,
          baseRadius: Math.min(width, height) * 0.08,
          angle: 0,
          orbitRadius: 0,
          orbitSpeed: 0,
        },
      ];
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    const animate = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const cx = centerX();
      const cy = centerY();

      // Update orbital positions for peripheral nodes
      nodes.forEach((node, i) => {
        if (node.label === 'FIDES') return;

        node.angle += node.orbitSpeed;
        node.baseX = cx + Math.cos(node.angle) * node.orbitRadius;
        node.baseY = cy + Math.sin(node.angle) * node.orbitRadius;

        node.baseX += Math.sin(time * 0.5 + i) * 3;
        node.baseY += Math.cos(time * 0.7 + i) * 3;
      });

      // Physics: mouse repulsion + spring back
      nodes.forEach((node) => {
        let targetX = node.baseX;
        let targetY = node.baseY;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          const force = (120 - dist) / 120;
          targetX -= Math.cos(angle) * force * 25;
          targetY -= Math.sin(angle) * force * 25;
        }

        node.x += (targetX - node.x) * 0.08;
        node.y += (targetY - node.y) * 0.08;

        node.x = Math.max(node.baseRadius, Math.min(width - node.baseRadius, node.x));
        node.y = Math.max(node.baseRadius, Math.min(height - node.baseRadius, node.y));
      });

      // Draw connections
      const centerNode = nodes.find((n) => n.label === 'FIDES')!;
      nodes.forEach((node) => {
        if (node.label === 'FIDES') return;

        const dx = centerNode.x - node.x;
        const dy = centerNode.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return;

        ctx.beginPath();
        const segments = 20;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const px = node.x + dx * t;
          const py = node.y + dy * t;
          const wave = Math.sin(t * Math.PI * 2 + time * 2) * 2;
          const perpX = -dy / dist;
          const perpY = dx / dist;

          if (i === 0) {
            ctx.moveTo(px + perpX * wave, py + perpY * wave);
          } else {
            ctx.lineTo(px + perpX * wave, py + perpY * wave);
          }
        }

        const mdx = mouseRef.current.x - (node.x + centerNode.x) / 2;
        const mdy = mouseRef.current.y - (node.y + centerNode.y) / 2;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const isHighlighted = mDist < 80;

        ctx.strokeStyle = isHighlighted
          ? 'rgba(197, 160, 89, 0.6)'
          : 'rgba(197, 160, 89, 0.2)';
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.stroke();
      });

      // Draw orbit rings
      nodes.forEach((node) => {
        if (node.label === 'FIDES') return;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius + 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isCenter = node.label === 'FIDES';

        // Outer glow
        ctx.save();
        ctx.shadowBlur = isCenter ? 40 : 25;
        ctx.shadowColor = 'rgba(197, 160, 89, 0.5)';

        // Outer ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(197, 160, 89, 0.1)';
        ctx.fill();
        ctx.restore();

        // Main circle
        ctx.save();
        ctx.shadowBlur = isCenter ? 30 : 20;
        ctx.shadowColor = '#C5A059';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2);

        // Gradient fill
        const grad = ctx.createRadialGradient(
          node.x - node.baseRadius * 0.3,
          node.y - node.baseRadius * 0.3,
          0,
          node.x,
          node.y,
          node.baseRadius
        );
        grad.addColorStop(0, isCenter ? '#DCCAA4' : '#D4B876');
        grad.addColorStop(1, '#C5A059');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // Inner highlight ring
        if (isCenter) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.baseRadius * 0.75, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(26, 26, 26, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Label
        ctx.save();
        ctx.font = `${isCenter ? 'bold' : '600'} ${isCenter ? Math.max(15, node.baseRadius * 0.45) : Math.max(13, node.baseRadius * 0.42)}px Inter, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#1A1A1A';
        ctx.fillText(node.label, node.x, node.y);
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Schéma des 4 pôles d'expertise du cabinet FIDES CONSEIL : Fiscal, Juridique, Assurance et Financier, orbitant autour du nœud central FIDES"
      role="img"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
      }}
    />
  );
}
