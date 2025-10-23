import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface CanvasModuleCardProps {
  icon: string;
  displayName: string;
  description: string;
  features: string[];
  targetAudience: string;
  index: number;
  path: string;
  color: string;
}

// Color mapping
const colorMap: Record<string, string> = {
  culture: '#ff6b35',      // Orange
  christianity: '#4a90e2', // Blue
  bibleKnow: '#9b59b6',    // Purple
  churchAdmin: '#ff6b6b'   // Light red
};

/**
 * Canvas-enhanced module card with elegant black & white design
 * Features interactive hover animations with particles and glow effects
 */
export function CanvasModuleCard({
  icon,
  displayName,
  description,
  features,
  targetAudience,
  index,
  path,
  color
}: CanvasModuleCardProps) {
  const themeColor = colorMap[color] || '#000000';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let frame = 0;
    let glowIntensity = 0;

    // Create elegant particle effect
    const createParticles = (count: number) => {
      const width = rect.width;
      const height = rect.height;

      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 60 + Math.random() * 60,
          size: 1 + Math.random() * 2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Smooth glow transition
      if (isHovered) {
        glowIntensity = Math.min(glowIntensity + 0.05, 1);
      } else {
        glowIntensity = Math.max(glowIntensity - 0.05, 0);
      }

      // Draw subtle background gradient on hover
      if (glowIntensity > 0) {
        const gradient = ctx.createRadialGradient(
          rect.width / 2, rect.height / 2, 0,
          rect.width / 2, rect.height / 2, rect.width / 2
        );
        gradient.addColorStop(0, `rgba(30, 30, 30, ${0.03 * glowIntensity})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      // Create new particles on hover
      if (isHovered && frame % 15 === 0) {
        createParticles(2);
      }

      // Update and draw particles (elegant white/gray shimmer)
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.life <= 0) return false;

        // Elegant white glow particles
        const alpha = (particle.life / 120) * 0.6 * glowIntensity;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow
        ctx.shadowBlur = 8 * glowIntensity;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      // Draw elegant geometric pattern (sacred geometry inspired)
      if (glowIntensity > 0.3) {
        ctx.strokeStyle = `rgba(200, 200, 200, ${0.1 * glowIntensity})`;
        ctx.lineWidth = 1;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = 40 + Math.sin(frame * 0.02) * 5;

        // Draw sacred circle pattern
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6 + frame * 0.01;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered]);

  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-300 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #d1d5db',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        padding: '24px',
        minHeight: '380px'
      }}
    >
      {/* Canvas background layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Card content */}
      <div className="relative z-10 p-4">
        {/* Icon with elegant animation */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-black text-white text-3xl shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <span className="group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>
          </div>
        </div>

        {/* Target audience badge */}
        <div className="mb-3">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold bg-gray-100 rounded-full uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            For {targetAudience}
          </span>
        </div>

        {/* Module title */}
        <h3
          className="text-2xl font-bold mb-3 transition-colors duration-300"
          style={{ color: themeColor }}
        >
          {displayName}
        </h3>

        {/* Description */}
        <p
          className="text-sm mb-6 leading-relaxed min-h-[3rem]"
          style={{ color: themeColor }}
        >
          {description}
        </p>

        {/* Features */}
        <div className="space-y-3 mb-4 min-h-[8rem]">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start">
              <div
                className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mr-3 transform group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: themeColor }}
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span
                className="text-xs font-medium flex-1 leading-tight"
                style={{ color: themeColor }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
          <Link
            to={path}
            className="inline-block text-center py-3 px-6 rounded-lg bg-black text-white font-semibold text-sm shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden group/btn"
            style={{
              display: 'inline-block',
              textAlign: 'center',
              padding: '12px 32px',
              borderRadius: '8px',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>Explore Now</span>
          </Link>
        </div>
      </div>

      {/* Elegant corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
    </div>
  );
}
