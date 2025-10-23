import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export function CanvasSymbolTransform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTransformed, setIsTransformed] = useState(false);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const fishBreadImgRef = useRef<HTMLImageElement>();
  const churchImgRef = useRef<HTMLImageElement>();
  const imagesLoadedRef = useRef(0);
  const isTransformedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Load images
    const fishBreadImg = new Image();
    const churchImg = new Image();

    fishBreadImg.onload = () => {
      imagesLoadedRef.current++;
      fishBreadImgRef.current = fishBreadImg;
    };

    churchImg.onload = () => {
      imagesLoadedRef.current++;
      churchImgRef.current = churchImg;
    };

    fishBreadImg.src = '/fish-bread-pattern.png';
    churchImg.src = '/churchsymbol.png';

    // Particle creation function
    const createParticles = (count: number, centerX: number, centerY: number) => {
      const colors = ['#10b981', '#8b5cf6', '#3b82f6', '#f59e0b', '#ec4899'];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1 + Math.random() * 2;
        particlesRef.current.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 60 + Math.random() * 40,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 4,
        });
      }
    };

    // Animation variables
    let frame = 0;
    let transformProgress = 0;
    let currentImageAlpha = 1;
    let targetImageAlpha = 0;
    let glowIntensity = 0;

    // Animation loop
    const animate = () => {
      if (imagesLoadedRef.current < 2) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Calculate transformation progress (slower speed for smoother rotation)
      if (isTransformedRef.current) {
        transformProgress = Math.min(transformProgress + 0.006, 1);
        currentImageAlpha = 1 - transformProgress;
        targetImageAlpha = transformProgress;
        glowIntensity = Math.sin(transformProgress * Math.PI) * 0.8;
      } else {
        transformProgress = Math.max(transformProgress - 0.006, 0);
        currentImageAlpha = 1 - transformProgress;
        targetImageAlpha = transformProgress;
        glowIntensity = Math.sin(transformProgress * Math.PI) * 0.8;
      }

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxSize = Math.min(rect.width, rect.height) * 0.85;

      // Add glow effect during transition
      if (glowIntensity > 0.1) {
        ctx.shadowBlur = 30 * glowIntensity;
        ctx.shadowColor = isTransformedRef.current ? '#8b5cf6' : '#10b981';
      }

      // Draw fish-bread image with 360-degree rotation and scale
      if (currentImageAlpha > 0.01 && fishBreadImgRef.current) {
        ctx.save();
        ctx.globalAlpha = currentImageAlpha;
        ctx.translate(centerX, centerY);
        ctx.rotate(transformProgress * Math.PI * 2); // Full 360-degree rotation
        ctx.scale(1 - transformProgress * 0.25, 1 - transformProgress * 0.25);
        ctx.drawImage(
          fishBreadImgRef.current,
          -maxSize / 2,
          -maxSize / 2,
          maxSize,
          maxSize
        );
        ctx.restore();
      }

      // Draw church symbol with 360-degree rotation and scale
      if (targetImageAlpha > 0.01 && churchImgRef.current) {
        ctx.save();
        ctx.globalAlpha = targetImageAlpha;
        ctx.translate(centerX, centerY);
        ctx.rotate(-transformProgress * Math.PI * 2); // Full 360-degree rotation (opposite direction)
        ctx.scale(0.75 + targetImageAlpha * 0.25, 0.75 + targetImageAlpha * 0.25);
        ctx.drawImage(
          churchImgRef.current,
          -maxSize / 2,
          -maxSize / 2,
          maxSize,
          maxSize
        );
        ctx.restore();
      }

      // Reset shadow
      ctx.shadowBlur = 0;

      // Create particles at transition points
      if (
        (transformProgress > 0.48 && transformProgress < 0.52) ||
        (transformProgress > 0.98)
      ) {
        if (frame % 3 === 0) {
          createParticles(8, centerX, centerY);
        }
      }

      // Update and draw particles
      ctx.globalAlpha = 1;
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.life <= 0) return false;

        const alpha = particle.life / particle.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw floating light orbs
      const orbCount = 6;
      for (let i = 0; i < orbCount; i++) {
        const angle = (frame * 0.01 + (i * Math.PI * 2) / orbCount);
        const radius = 100 + Math.sin(frame * 0.02 + i) * 20;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, isTransformed ? 'rgba(139, 92, 246, 0.6)' : 'rgba(16, 185, 129, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
      }

      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Trigger transformation every 15 seconds
    const transformTimer = setTimeout(() => {
      isTransformedRef.current = true;
    }, 15000);

    const rotationInterval = setInterval(() => {
      isTransformedRef.current = !isTransformedRef.current;
    }, 15000);

    // Handle window resize
    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(transformTimer);
      clearInterval(rotationInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      />
    </div>
  );
}
